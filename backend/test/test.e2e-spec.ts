import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpError } from 'src/common/errors/http-error';

import { Prisma } from '@prisma/client';

type TestType = Prisma.TestGetPayload<{ include: { problems: true } }>;
type ApiResponse = { access_token: string };

describe('Tests API (e2e)', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

  const testUser = {
    email: 'testuser_t@example.com',
    password: 'TestPass123',
    role: 'ADMIN',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    app.enableVersioning({
      type: VersioningType.URI,
      prefix: 'api/v',
    });

    await app.init();
    server = app.getHttpServer() as unknown as Parameters<typeof request>[0];
  });

  let token: string;
  it('/api/v1/auth/register (POST) - register admin user', async () => {
    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(testUser);

    const body = res.body as ApiResponse;
    expect(res.status).toBe(201);
    expect(body.access_token).toBeDefined();
    token = body.access_token;
  });

  it('/api/v1/tests (POST) - should create a test with no problems', async () => {
    const newTest = {
      name: 'Sample Test',
      slug: 'sample-test',
      description: 'A mock test with no problems.',
      password: 'securepass123',
    };

    const res = await request(server)
      .post('/api/v1/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(newTest);

    const body = res.body as TestType;
    expect(res.status).toBe(201);
    expect(body.slug).toBe('sample-test');
    expect(body.problems).toHaveLength(0);
  });

  it('/api/v1/tests (POST) - should return 400 if slug already exists', async () => {
    const duplicateTest = {
      name: 'Duplicate Slug',
      slug: 'sample-test',
      password: 'anotherpass',
    };

    const res = await request(server)
      .post('/api/v1/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(duplicateTest);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('already exists');
  });

  it('/api/v1/tests (POST) - should return 400 if required field is missing', async () => {
    const invalidTest = {
      slug: 'missing-name',
      password: 'nopass',
    };

    const res = await request(server)
      .post('/api/v1/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidTest);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('name must be a string');
  });

  it('/api/v1/tests (POST) - should return 400 for non-existent problem slug', async () => {
    const invalidTest = {
      name: 'Invalid Test',
      slug: 'invalid-test',
      description: 'Test with bad problem slugs',
      password: 'secret',
      problems: ['not-found'],
    };

    const res: request.Response = await request(server)
      .post('/api/v1/tests')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidTest);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('Problems not found: not-found');
  });

  it('/api/v1/tests (GET) - should return list of tests', async () => {
    const res = await request(server)
      .get('/api/v1/tests')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('/api/v1/clear-db/users (DELETE) - should truncate the users table', async () => {
    const res = await request(server)
      .delete('/api/v1/clear-db/users')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('/api/v1/clear-db/tests (DELETE) - should truncate the tests table', async () => {
    const res = await request(server)
      .delete('/api/v1/clear-db/tests')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
