import { EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDTO, AuthSignInDTO } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO) {
    const { firstname, lastname, username, password } = authCredentialsDTO;

    const user = new User();
    user.firstname = firstname;
    user.lastname = lastname;
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);
    try {
      return await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(authSignInDTO: AuthSignInDTO): Promise<any> {
    const { username, password } = authSignInDTO;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        is_active: user.is_active,
        username: user.username,
      };
    }
    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
