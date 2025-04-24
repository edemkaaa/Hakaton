import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const mockUser = {
    id: 1,
    username: 'edem@mail.ru',
      
    password: 'asanov123',
    role: 'user',
  };

  const mockUsersService = {
    findByUsername: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('validateUser', () => {
    it('should return user object when credentials are valid', async () => {
      const password = 'correctPassword';
      mockUsersService.findByUsername.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.validateUser('test@example.com', password);

      expect(result).toEqual({
        id: mockUser.id,
        username: mockUser.username,
        role: mockUser.role,
      });
    });

    it('should return null when user is not found', async () => {
      mockUsersService.findByUsername.mockResolvedValue(null);

      const result = await service.validateUser('nonexistent@example.com', 'password');

      expect(result).toBeNull();
    });

    it('should return null when password is invalid', async () => {
      mockUsersService.findByUsername.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      const result = await service.validateUser('test@example.com', 'wrongPassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token when login is successful', async () => {
      const mockToken = 'jwt-token';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.login(mockUser);

      expect(result).toEqual({
        access_token: mockToken,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        username: mockUser.username,
        sub: mockUser.id,
        role: mockUser.role,
      });
    });
  });
});