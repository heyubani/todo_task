import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

// Mock factory functions
const mockUserRepository = () => ({
  signUp: jest.fn(),
  validateUserPassword: jest.fn(),
});

const mockJwtService = () => ({
  signAsync: jest.fn(),
});

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;
  let jwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserRepository, useFactory: mockUserRepository },
        { provide: JwtService, useFactory: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<UserRepository>(UserRepository);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('signUp', () => {
    it('should successfully sign up the user', async () => {
      const mockAuthCredentialsDTO = {
        firstname: 'John',
        lastname: 'Doe',
        username: 'testuser',
        password: 'TestPass123',
      };
      userRepository.signUp.mockResolvedValue('Successfully signed up');
      expect(await authService.signUp(mockAuthCredentialsDTO)).toEqual(
        'Successfully signed up',
      );
    });
  });

  describe('signIn', () => {
    it('should throw an UnauthorizedException if credentials are invalid', async () => {
      userRepository.validateUserPassword.mockResolvedValue(null);
      await expect(
        authService.signIn({ username: 'testuser', password: 'wrongPassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return the access token if credentials are valid', async () => {
      const mockUser = {
        username: 'testuser',
        firstname: 'Test',
        lastname: 'User',
        is_active: true,
      };
      userRepository.validateUserPassword.mockResolvedValue(mockUser);
      jwtService.signAsync.mockResolvedValue('signedToken123');

      const result = await authService.signIn({
        username: 'testuser',
        password: 'TestPass123',
      });
      expect(result).toEqual({
        firstname: 'Test',
        lastname: 'User',
        username: 'testuser',
        is_active: true,
        accessToken: 'signedToken123',
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith({
        username: 'testuser',
      });
    });
  });
});
