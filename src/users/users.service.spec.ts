/**
 * package.json test 파일 정규식표현으로 정의되어있는데로 spec 명으로 생성해줘야함.
 */
import { Test } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { JwtService } from '../jwt/jwt.service';
import { MailService } from '../mail/mail.service.';
import { getRepository, Repository } from 'typeorm';

// 가짜 function 을 만든다
const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockMailService = {
  sendVerificationEmail: jest.fn(),
};

type MockRepository<T = any> = Partial<
  Record<keyof Repository<User>, jest.Mock>
>;
/**
 * 유저 서비스민의 테스트
 */
describe('UserService', () => {
  let service: UsersService;

  //keyof Repository<User> : User Repository의 모든 요소들을 의미한다. (findOne, delete, save 등등)
  let usersRepository: MockRepository<User>;
  //테스팅모듈을 만든다.
  //유저서비스만의 독자적인 모듈을 만들어준다.
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Verification),
          useValue: mockRepository(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  //계정생성 테스트 ( 어떻게 db에 계정을 생성할까?..)
  // 실제로 typeorm 연결 및 데이터 생성하는것이아님
  // 우리는 말 그대로 코드의 각 줄을 테스트 하는 것
  describe('createAccount', () => {
    const createAccountArgs = {
      email: '',
      password: '',
      role: 0,
    };

    // 계정생성시에 이미 존재하는지 체크 테스트
    it('should fail if user exists', async () => {
      //user find One이 아래의 aalalala email 값이 나올것이라고 속인것
      usersRepository.findOne.mockResolvedValue({
        id: 1,
        email: 'aalalalalal',
      });
      const result = await service.createAccount(createAccountArgs);
      expect(result).toMatchObject({
        ok: false,
        error: 'There is a user with that email already',
      });
    });

    it('should create a new user', async () => {
      usersRepository.findOne.mockResolvedValue(undefined);
      usersRepository.create.mockReturnValue(createAccountArgs);

      await service.createAccount(createAccountArgs);
      expect(usersRepository.create).toHaveBeenCalledTimes(1);
      expect(usersRepository.create).toHaveBeenCalledWith(createAccountArgs);
      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(usersRepository.save).toHaveBeenCalledWith(createAccountArgs);
    });
  });

  it.todo('createAccount');
  it.todo('login');
  it.todo('findById');
  it.todo('editProfile');
  it.todo('verifyEmail');
});
