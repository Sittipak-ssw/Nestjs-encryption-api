import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/get-encrypt-data (POST)', () => {
    return request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload: 'test message' })
      .expect(201)
      .expect(res => {
        expect(res.body.successful).toBe(true);
        expect(res.body.data.data1).toBeDefined();
        expect(res.body.data.data2).toBeDefined();
      });
  });

  it('/get-decrypt-data (POST)', async () => {
    const encryptRes = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload: 'test message' });

    const { data1, data2 } = encryptRes.body.data;

    return request(app.getHttpServer())
      .post('/get-decrypt-data')
      .send({ data1, data2 })
      .expect(201)
      .expect(res => {
        expect(res.body.successful).toBe(true);
        expect(res.body.data.payload).toBe('test message');
      });
  });
});
