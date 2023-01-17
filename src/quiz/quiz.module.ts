import { SignUpModule } from './../sign-up/sign-up.module';
import { Quiz } from './schema/quiz.schema';
import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizSchema } from './schema/quiz.schema';
import { MiddlewareConsumer, NestModule } from '@nestjs/common/interfaces';
import { QuizMiddleware } from './quiz.middleware';
import { signUp, signUpSchema } from 'src/sign-up/schema/sign-up.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Quiz.name, schema: QuizSchema },
      { name: signUp.name, schema: signUpSchema },
    ]),
    SignUpModule,
  ],
  controllers: [QuizController],
  providers: [QuizService],
})
export class QuizModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(QuizMiddleware).forRoutes('quiz/topic-quiz/:id');
  }
}
