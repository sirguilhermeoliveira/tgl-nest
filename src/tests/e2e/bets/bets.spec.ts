import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../../../app.module';
import { authMock_1 } from '../../mocks/auth.mocks';
import { betMock_1 } from '../../mocks/bets.mocks';

describe('Bets', () => {
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

  describe('/bets (POST)', () => {
    it('should return bet created succesfully!', async () => {
      const responseLogin = await request(app.getHttpServer())
        .post('/login')
        .send({ ...authMock_1 })
        .expect(200);
      expect(responseLogin.body.access_token).toBeDefined();
      const token = responseLogin.body.access_token;

      const responseBet = await request(app.getHttpServer())
        .post('/bets')
        .set('Authorization', `Bearer ${token}`)
        .send({ ...betMock_1 })
        .expect(201);
      expect(responseBet.body.message).toEqual('Bet created succesfully!');
    });
  });
});
