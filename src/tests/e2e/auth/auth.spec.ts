import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { authMock_1 } from '../../mocks/auth.mocks';

describe('Login', () => {
  let app: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/login (POST)', () => {
    it('should return an access token on successful login', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1 })
        .expect(200);
      expect(response.body.access_token).toBeDefined();
    });

    it('should return email doesnt exist on database', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ email: 'invalid@gmail.com', password: 'invalid' })
        .expect(401);
      expect(response.body.message).toEqual('Email doesnt exist on database.');
    });
    it('should return password is incorrect', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1, password: 'invalid' })
        .expect(401);
      expect(response.body.message).toEqual('Password is incorrect.');
    });
  });
});
