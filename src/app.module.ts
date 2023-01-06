import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { SignUpModule } from './sign-up/sign-up.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.local.env'],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        uri: ConfigService.get('MONGO_uri'),
      }),
      inject: [ConfigService],
    }),
    SignUpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
