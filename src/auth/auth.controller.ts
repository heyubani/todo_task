import { AuthCredentialsDTO, AuthSignInDTO } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { successResponse } from '../utils';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }
  @Post('/signup')
  async signUp(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDTO) {
    const data = await this.authService.signUp(authCredentialsDTO);
    return successResponse(201, 'User created successfully', data);
  }

  @HttpCode(200)
  @Post('/signin')
  async signIn(@Body(ValidationPipe) authSignInDTO: AuthSignInDTO) {
    const data = await this.authService.signIn(authSignInDTO);
    return successResponse(200, 'User logged in successfully', data);
  }
}
