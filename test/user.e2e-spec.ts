import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getConnection, Repository } from 'typeorm';
import { User } from '../src/users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

jest.mock('got', () => {
  return {
    post: jest.fn(),
  };
});
const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  email: 'nico@las.com',
  password: '12345',
}

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>
  let jwtToken: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
    await app.init();
  });

  //테스트끝나고 실행
  afterAll(async () => {
    //테스트가 끝나고 테스트베드 데이터베이스는 드랍해야한다.
    await getConnection().dropDatabase();
    app.close();
  });

  describe('createAccount', () => {
    it('should create account', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
         mutation {
            createAccount(input: {
              email: "${testUser.email}",
              password: "${testUser.password}",
              role: Owner
            }) {
              ok
              error
            }
         }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });
    it('should fail if account already exists', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
         mutation {
            createAccount(input: {
              email: "${testUser.email}",
              password: "${testUser.password}",
              role: Owner
            }) {
              ok
              error
            }
         }
        `,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(false);
          expect(res.body.data.createAccount.error).toEqual(expect.any(String));
        });
    });
  });

  describe('login', () => {
    it("should login with correct", () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query :`
            mutation {
              login(input: {
                email: "${testUser.email}",
                password: "${testUser.password}",
              }) {
                ok
                error
                token
              }
            }
          `
        })
        .expect(200)
        .expect(res => {
          const {
            body : {
              data : { login },
            }
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        })
    })
    it("should not be able to login with wrong credentials", () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query :`
            mutation {
              login(input: {
                email: "${testUser.email}",
                password: "xxx",
              }) {
                ok
                error
                token
              }
            }
          `
        })
        .expect(200)
        .expect(res => {
          const {
            body : {
              data : { login },
            }
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong password');
          expect(login.token).toBe(null);
        })
    })
  })

  describe('userProfile', () => {
    let userId : number;
    beforeAll(async () => {
      console.log(await userRepository.find())
      const [user] = await userRepository.find();
    })
    it("should see a user's profile", () => {

    })
    it.todo("should not find a profile");
  })
  it.todo('userProfile');
  it.todo('me');
  it.todo('verifyEmail');
  it.todo('editProfile');
});
