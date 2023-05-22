import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { authMock_1 } from '../../fakes/auth.fakes';
import { userMock_1 } from '../../fakes/users.fakes';

describe('Users', () => {
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

  describe('/users (POST)', () => {
    it('should create a user', async () => {
      const responseCreateUser = await request(app.getHttpServer())
        .post('/users')
        .send({ ...userMock_1 })
        .expect(201);
      expect(responseCreateUser.body.message).toEqual('User created successfully!');
    });
  });

  describe('/users (DELETE)', () => {
    it('should delete a user', async () => {
      const responseLogin = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1 })
        .expect(200);
      expect(responseLogin.body.access_token).toBeDefined();
      const token = responseLogin.body.access_token;

      const responseCreateGame = await request(app.getHttpServer())
        .delete(`users/${userMock_1.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(responseCreateGame.body.message).toEqual('Deleted successfully!');
    });
  });
});
