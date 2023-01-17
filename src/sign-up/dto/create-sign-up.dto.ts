export class CreateSignUpDto {
  email: string;
  password: string;
  cPassword: string;
}
export class CreateLoginDto {
  static cPassword: any;
  static password: any;
  static email: any;
  _id: string;
  save: any;
}
export class CreateOtpDto {
  otp: string;
  email: string;
}
export class Data {
  password: string;
  cPassword: string;
}
