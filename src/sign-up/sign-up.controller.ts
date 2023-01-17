import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SignUpService } from './sign-up.service';
import {
  CreateSignUpDto,
  CreateLoginDto,
  CreateOtpDto,
  Data,
} from './dto/create-sign-up.dto';
import { UpdateSignUpDto } from './dto/update-sign-up.dto';
import { Put } from '@nestjs/common/decorators';

@Controller('sign-up')
export class SignUpController {
  constructor(private readonly signUpService: SignUpService) {}

  @Post()
  create(@Body() createSignUpDto: CreateSignUpDto) {
    return this.signUpService.create(createSignUpDto);
  }

  @Post('login')
  Login(@Body() CreateLoginDto: CreateLoginDto) {
    return this.signUpService.Login(CreateLoginDto);
  }

  @Post('otp-send')
  Otp(@Body() createOtpDto: CreateOtpDto) {
    return this.signUpService.Otp(createOtpDto);
  }

  @Put('reset-password/:id')
  resetPass(@Param() id: string, @Body() Data: Data) {
    return this.signUpService.resetPass(id, Data);
  }

  @Get()
  findAll() {
    return this.signUpService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.signUpService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSignUpDto: UpdateSignUpDto) {
    return this.signUpService.update(+id, updateSignUpDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.signUpService.remove(+id);
  }
}
