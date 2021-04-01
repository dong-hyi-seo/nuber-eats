import { JwtService } from './jwt.service';
import { Test } from '@nestjs/testing';
import { CONFIG_OPTIONS } from '../common/common.constants';
import * as jwt from 'jsonwebtoken';

//jsonwebtoken library를 실제로 안쓰고 가짜로 쓰고싶을경우
//아무리 jsonwebtoken실제 라이브러리를 import해도 가짜로 대체됨
jest.mock('jsonwebtoken', () => {
  return {
    sign: jest.fn(() => 'TOKEN'),
  };
});

const TEST_KEY = 'testKey';
describe('JwtService', () => {
  let service: JwtService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtService,
        {
          provide: CONFIG_OPTIONS,
          useValue: { privateKey: TEST_KEY },
        },
      ],
    }).compile();
    service = module.get<JwtService>(JwtService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sign', () => {
    it('should return a signed token', () => {
      const ID = 1;
      const token = service.sign(ID);
      expect(typeof token).toBe('string');
      expect(jwt.sign).toHaveBeenCalledTimes(1);
      expect(jwt.sign).toHaveBeenCalledWith({ id: ID }, TEST_KEY);
    });
  });
  describe('verify', () => {
    it('should return the decoded token', () => {});
  });
});
