import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  const mockUser: Partial<User> = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'hashedPassword123',
    isActive: true,
    createdAt: new Date(),
    role: 'user',
  };

  const mockRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findByUsername', () => {
    it('should return a user when found', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findByUsername('john@example.com');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'john@example.com' },
      });
    });

    it('should return undefined when user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByUsername('nonexistent@example.com');

      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com' },
      });
    });
  });

  describe('create', () => {
    const createUserData: Partial<User> = {
      firstName: 'edem',
      lastName: 'asanov',
      email: 'edem@mail.ru',
      password: 'password123',
    };

    it('should successfully create a user', async () => {
      const createdUser = { ...createUserData, id: 2, isActive: true, createdAt: expect.any(Date) };
      
      mockRepository.create.mockReturnValue(createdUser);
      mockRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(createUserData);

      expect(result).toEqual(createdUser);
      expect(mockRepository.create).toHaveBeenCalledWith({
        ...createUserData,
        isActive: true,
        createdAt: expect.any(Date),
      });
      expect(mockRepository.save).toHaveBeenCalledWith(createdUser);
    });

    it('should handle errors during user creation', async () => {
      const error = new Error('Database error');
      mockRepository.save.mockRejectedValue(error);
      mockRepository.create.mockReturnValue(createUserData);

      await expect(service.create(createUserData)).rejects.toThrow(error);
    });
  });

  describe('findByEsiaId', () => {
    const esiaId = 'esia123';

    it('should return a user when found by ESIA ID', async () => {
      const userWithEsia = { ...mockUser, esiaId };
      mockRepository.findOne.mockResolvedValue(userWithEsia);

      const result = await service.findByEsiaId(esiaId);

      expect(result).toEqual(userWithEsia);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { esiaId },
      });
    });

    it('should return undefined when user not found by ESIA ID', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findByEsiaId('nonexistent-esia-id');

      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { esiaId: 'nonexistent-esia-id' },
      });
    });
  });
});