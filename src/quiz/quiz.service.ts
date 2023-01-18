import { async } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { signUp } from 'src/sign-up/schema/sign-up.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './schema/quiz.schema';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name)
    private QuizDocument,
    @InjectModel(signUp.name)
    private signUpSchema,
  ) {}
  create(createQuizDto: CreateQuizDto) {
    // console.log(createQuizDto);
    const model = new this.QuizDocument(createQuizDto);
    console.log(model);
    model.save();
    return model;
  }

  findByTopic = async (findByTopic, id) => {
    // console.log(findByTopic);
    const data = new this.QuizDocument(findByTopic);
    data.userId = id;
    // data.push({score:});
    // console.log(data.userId,"---------");
    // const signUpData = await this.signUpSchema.find();
    // console.log(signUpData);
    data.save();
    const model = await this.QuizDocument.find({ topic: data.Topic }).limit(5);
    return { userId: id, data: model };
  };

  getByTopic = async (id) => {
    console.log(id);
    const data =await this.QuizDocument.findOne({ userId: id });
    console.log(data);
    const model = await this.QuizDocument.find({ topic: data.Topic }).limit(6);
    return { userId: id, data: model };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: string, updateQuizDto: UpdateQuizDto) {
    const data = new this.QuizDocument(updateQuizDto);
    data.userId = id;
    console.log(data);
    data.save();
    return data;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
