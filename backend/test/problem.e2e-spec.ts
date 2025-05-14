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

type Problem = Prisma.ProblemGetPayload<object>;

describe('Problems API (e2e)', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Match production behavior
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

  it('/api/v1/problems (GET) - should return list', async () => {
    const res: request.Response = await request(server).get('/api/v1/problems');
    const body = res.body as Problem;
    expect(res.status).toBe(200);
    expect(Array.isArray(body)).toBe(true);
  });

  it('/api/v1/problems (POST) - create new problem', async () => {
    const newProblem = {
      name: 'Test Problem',
      slug: 'test-problem',
      difficulty: 'EASY',
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Test Description',
      iconPath: '/icons/test.png',
    };

    const res: request.Response = await request(server)
      .post('/api/v1/problems')
      .send(newProblem);
    const body = res.body as Problem;
    expect(res.status).toBe(201);
    expect(body.slug).toBe('test-problem');
  });

  it('/api/v1/problems/:slug (GET) - should return problem', async () => {
    const res: request.Response = await request(server).get(
      '/api/v1/problems/test-problem',
    );
    const body = res.body as Problem;
    expect(res.status).toBe(200);
    expect(body.name).toBe('Test Problem');
  });

  it('/api/v1/problems/:slug (DELETE) - should delete problem', async () => {
    const res: request.Response = await request(server).delete(
      '/api/v1/problems/test-problem',
    );
    const body = res.body as Problem;
    expect(res.status).toBe(200);
    expect(body.slug).toBe('test-problem');
  });

  it('/api/v1/problems (POST) - should return 400 for missing name', async () => {
    const invalidProblem = {
      slug: 'invalid-problem',
      difficulty: 'EASY',
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Test Description',
      iconPath: '/icons/test.png',
    };

    const res: request.Response = await request(server)
      .post('/api/v1/problems')
      .send(invalidProblem);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('name should not be empty');
  });

  it('/api/v1/problems (POST) - should return 400 for invalid difficulty', async () => {
    const invalidProblem = {
      name: 'Invalid Difficulty Problem',
      slug: 'invalid-difficulty',
      difficulty: 'SUPER_EASY',
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Test Description',
      iconPath: '/icons/test.png',
    };

    const res: request.Response = await request(server)
      .post('/api/v1/problems')
      .send(invalidProblem);

    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain(
      'difficulty must be one of the following values: EASY, MEDIUM, HARD',
    );
  });

  it('/api/v1/problems/:slug (GET) - should return 404 for non-existent problem', async () => {
    const res: request.Response = await request(server).get(
      '/api/v1/problems/invalid-slug',
    );
    const body = res.body as HttpError;
    expect(res.status).toBe(404);
    expect(body.message).toBe('Problem with slug "invalid-slug" not found');
  });

  it('/api/v1/problems/:slug (DELETE) - should return 404 for non-existent problem', async () => {
    const res: request.Response = await request(server).delete(
      '/api/v1/problems/invalid-slug',
    );
    const body = res.body as HttpError;
    expect(res.status).toBe(404);
    expect(body.message).toBe('Problem with slug "invalid-slug" not found');
  });

  it('/api/v1/problems/:slug (GET) - should return 404 for invalid slug format', async () => {
    const res: request.Response = await request(server).get(
      '/api/v1/problems/invalid#slug',
    );
    const body = res.body as HttpError;
    expect(res.status).toBe(404);
    expect(body.message).toBe('Problem with slug "invalid" not found');
  });

  it('/api/v1/problems (POST) - should return 400 for invalid slug format', async () => {
    const invalidSlugProblem = {
      name: 'Invalid Slug Problem',
      slug: 'Invalid_Slug!', // ❌ Invalid format: uppercase + special character
      difficulty: 'EASY',
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Problem with bad slug',
      iconPath: '/icons/test.png',
    };

    const res: request.Response = await request(server)
      .post('/api/v1/problems')
      .send(invalidSlugProblem);
    const body = res.body as HttpError;
    expect(res.status).toBe(400);
    expect(body.message).toContain('Slug must be lowercase, kebab-case');
  });

  afterAll(async () => {
    await app.close();
  });
});
