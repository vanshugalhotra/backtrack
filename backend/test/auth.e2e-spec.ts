import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { HttpError } from 'src/common/errors/http-error';

export type ApiResponse = {
  access_token: string;
};

describe('Auth API (e2e)', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

  const testUser = {
    email: 'testuser@example.com',
    password: 'TestPass123',
    role: 'ADMIN',
  };

  const testUserLogin = {
    email: 'testuser@example.com',
    password: 'TestPass123',
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
  it('/api/v1/auth/register (POST) - should register a new user', async () => {
    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(testUser);

    const body = res.body as ApiResponse;
    expect(res.status).toBe(201);
    expect(body.access_token).toBeDefined();
    token = body.access_token; // Store the token for later use
  });

  it('/api/v1/auth/register (POST) - should fail if email already exists', async () => {
    const res = await request(server)
      .post('/api/v1/auth/register')
      .send(testUser);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('Email is already registered');
  });

  it('/api/v1/auth/register (POST) - should fail on invalid email format', async () => {
    const res = await request(server).post('/api/v1/auth/register').send({
      email: 'invalid-email',
      password: 'Password123',
    });

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('email must be an email');
  });

  it('/api/v1/auth/login (POST) - should login an existing user', async () => {
    const res = await request(server)
      .post('/api/v1/auth/login')
      .send(testUserLogin);

    const body = res.body as ApiResponse;
    expect(res.status).toBe(201);
    expect(body.access_token).toBeDefined();
  });

  it('/api/v1/auth/login (POST) - should fail with wrong password', async () => {
    const res = await request(server).post('/api/v1/auth/login').send({
      email: testUser.email,
      password: 'WrongPassword',
    });

    const body = res.body as HttpError;
    expect(res.status).toBe(403);
    expect(body.message).toContain('Invalid credentials');
  });

  it('/api/v1/auth/login (POST) - should fail with unregistered email', async () => {
    const res = await request(server).post('/api/v1/auth/login').send({
      email: 'nonexistent@example.com',
      password: 'somepass',
    });

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('Invalid credentials');
  });

  it('/api/v1/clear-db/users (DELETE) - should truncate the users table', async () => {
    const res = await request(server)
      .delete('/api/v1/clear-db/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
