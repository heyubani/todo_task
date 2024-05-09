import { AuthCredentialsDTO, AuthSignInDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO) {
    return this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authSignInDTO: AuthSignInDTO): Promise<object> {
    const user = await this.userRepository.validateUserPassword(authSignInDTO);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      is_active: user.is_active,
      accessToken,
    };
  }
}
