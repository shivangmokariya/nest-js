import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { JwtModule } from '@nestjs/jwt';
// const jwt = require('jsonwebtoken');

export type QuizDocument = Quiz & Document;

@Schema({ timestamps: true })
export class Quiz {
  @Prop()
  question: string;

  @Prop()
  Options: Array<0>;

  @Prop()
  ans: string;

  @Prop()
  Topic: Array<1>;

  @Prop()
  topic: string;

  @Prop()
  userId: string;

  @Prop()
  score: string;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
