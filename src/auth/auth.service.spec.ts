import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { AppModule } from '../app.module';

describe('UserService', () => {
  let service: AuthService;
  // const connection = getConnection();
  // console.log('connection', connection);
  beforeEach(async () => {
    // if (connection.isConnected) {
    //   await connection.close();
    // }
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = await service.signUp({
      firstname: 'john',
      lastname: 'doe',
      username: 'jasjjas',
      password: 'Password@1',
    });

    expect(user).toBeDefined();
  });
});
