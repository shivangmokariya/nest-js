import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSignUpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import * as bcrypt from 'bcrypt';
import { signUp, SignupDocument } from './schema/sign-up.schema';

@Injectable()
export class SignUpService {
  constructor(
    @InjectModel(signUp.name)
    private SignupDocument: Model<SignupDocument>,
  ) {}

  create = async (createSignUpDto: CreateSignUpDto) => {
    const model = new this.SignupDocument(createSignUpDto);
    console.log(createSignUpDto);
    model.password = await bcrypt.hash(model.password, 10);
    model.cPassword = await bcrypt.hash(model.cPassword, 10);
    console.log(model.password);
    // const token = await model.generateAuthToken();
    return model.save();
  };

  Login = async (CreateLoginDto) => {
    const model = new this.SignupDocument(CreateLoginDto);
    // console.log(model);
    const data = await this.SignupDocument.find({
      email: model.email,
    }).exec();
    let isMatch;
    console.log(data[0], '+++++++');
    if (data[0] !== undefined) {
      isMatch = await bcrypt.compare(model.password, data[0].password);
      console.log(data[0].password);
      if (isMatch == true) {
        return { status: 200, msg: 'successsfully logged in' };
      } else {
        return { status: 400, msg: 'invalid crediantial 1' };
      }
    } else {
      return { status: 400, msg: 'invalid crediantial 2' };
    }
    // console.log(data[0].email);
  };

  findAll() {
    return `This action returns all signUp`;
  }

  findOne(id: number) {
    return `This action returns a #${id} signUp`;
  }

  update(id: number, updateSignUpDto: UpdateSignUpDto) {
    return `This action updates a #${id} signUp`;
  }

  remove(id: number) {
    return `This action removes a #${id} signUp`;
  }
}
