import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSignUpDto, CreateOtpDto } from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import * as bcrypt from 'bcrypt';
import { signUp, SignupDocument } from './schema/sign-up.schema';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JwtModule, JwtService } from '@nestjs/jwt';

@Injectable()
export class SignUpService {
  static SignupDocument: any;
  constructor(
    @InjectModel(signUp.name)
    private SignupDocument: Model<SignupDocument>,
    private JwtService: JwtService,
  ) {}
  create = async (createSignUpDto: CreateSignUpDto) => {
    const model = new this.SignupDocument(createSignUpDto);
    // console.log(createSignUpDto);
    const data = await this.SignupDocument.findOne({ email: model.email });
    // console.log(data);
    if (!data) {
      model.password = await bcrypt.hash(model.password, 10);
      model.cPassword = await bcrypt.hash(model.cPassword, 10);
      // console.log(model.password);
      // const token = await model.generateAuthToken();
      model.save();
      return { message: 'Registered successfully', status: 200, data: model };
    } else {
      throw new HttpException(
        'Email id is already exist',
        HttpStatus.FORBIDDEN,
      );
    }
  };

  Login = async (CreateLoginDto) => {
    const model = new this.SignupDocument(CreateLoginDto);
    // console.log(model);
    const data = await this.SignupDocument.find({
      email: model.email,
    }).exec();
    // console.log("---",data[0]._id,"+++");

    // console.log(jwt);
    let isMatch;
    // console.log(data[0], '+++++++');
    if (data[0] !== undefined) {
      isMatch = await bcrypt.compare(model.password, data[0].password);
      // console.log(data[0].password);
      if (isMatch == true) {
        const jwt = await this.JwtService.signAsync({ id: data[0]._id });
        return {
          status: 200,
          msg: 'successsfully logged in',
          Data: data[0],
          token: jwt,
        };
      } else {
        throw new HttpException(
          'password is incorrect',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }
    } else {
      throw new HttpException(
        'Email Id is incorrect',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
    // console.log(data[0].email);
  };
  nodemailer = require('nodemailer');
  Otp = async (createOtpDto: CreateOtpDto) => {
    // console.log(createOtpDto);
    const model = new this.SignupDocument(createOtpDto);
    console.log(model);
    const data = await this.SignupDocument.findOne({ email: model.email });
    console.log(data);
    if (data) {
      const otpCode = 2000 + Math.floor(Math.random() + Math.random() * 900);
      console.log(otpCode);
      const transporter = this.nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        auth: {
          user: 'vedantrakholiya@gmail.com',
          pass: 'jauwbrpvouchznds',
        },
      });
      const mailOptions = {
        from: 'QuizGrad.dignizant@gmail.com',
        to: model.email,
        subject: 'Sending Email from QuizGrad.dignizant@gmail.com',
        text: `Your OTP is ${otpCode}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return { message: 'Otp send Succefully', status: 200, data: data };
    } else {
      return { message: 'Email is incorrect', status: 400 };
    }
  };
  resetPass = async (id, Data) => {
    // console.log(Data.email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const model = new this.SignupDocument(Data);
    // console.log(model);
    const data = await this.SignupDocument.findOne({ _id: id.id });
    console.log(data);
    let userPassword = await Data.password;
    let userCPassword = await Data.cPassword;
    if (userPassword == userCPassword) {
      userPassword = await bcrypt.hash(userPassword, 10);
      userCPassword = await bcrypt.hash(userCPassword, 10);
      const updatedData = await this.SignupDocument.updateOne(
        { _id: id.id },
        { $set: { password: userPassword, cPassword: userCPassword } },
      );
      console.log(updatedData);
      return { message: 'successfully password reset', status: 200 };
    } else {
      return { message: 'Password not reset', status: 400 };
    }
  };
  findAll() {
    const data = this.SignupDocument.find();
    // console.log(data);
    return data;
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
