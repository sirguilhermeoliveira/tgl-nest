import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { authMock_1 } from '../../../tests/mocks/auth.mocks';
import { gameMock_1 } from '../../../tests/mocks/games.mocks';

describe('Games', () => {
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

  describe('/games (POST)', () => {
    it('should create a game', async () => {
      const responseLogin = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1 })
        .expect(200);
      expect(responseLogin.body.access_token).toBeDefined();
      const token = responseLogin.body.access_token;

      const responseCreateGame = await request(app.getHttpServer())
        .post('/games')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...gameMock_1 })
        .expect(200);
      expect(responseCreateGame.body.message).toEqual('Game created succesfully!');
    });
  });
  describe('/games (DELETE)', () => {
    it('should delete a game', async () => {
      const responseLogin = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1 })
        .expect(200);
      expect(responseLogin.body.access_token).toBeDefined();
      const token = responseLogin.body.access_token;

      const responseCreateGame = await request(app.getHttpServer())
        .post(`games/${gameMock_1.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);
      expect(responseCreateGame.body.message).toEqual('Game deleted succesfully!');
    });
  });
});
