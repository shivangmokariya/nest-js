import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import { JwtModule } from '@nestjs/jwt';
// const jwt = require('jsonwebtoken');

export type SignupDocument = signUp & Document;

@Schema()
export class signUp {
  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  cPassword: string;
  @Prop()
  token: string;
}

export const signUpSchema = SchemaFactory.createForClass(signUp);
// let token;

// export SignupDocument.methods.generateAuthToken = async function () {
//   try {
//     token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
//     console.log(token);
//     //   this.tokens = this.tokens.concat({ token: token })
//     //   if (this.tokens) {
//     //     // console.log("already token");
//     //   } else {
//     //     this.save();
//     //   }

//     //   return token;
//   } catch (e) {
//     // res.send(e);
//     console.log(e);
//   }
// };
