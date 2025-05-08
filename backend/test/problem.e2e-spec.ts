import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Problems API (e2e)', () => {
  let app: INestApplication;

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
  });

  it('/api/v1/problems (GET) - should return list', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/problems');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
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

    const res = await request(app.getHttpServer())
      .post('/api/v1/problems')
      .send(newProblem);
    expect(res.status).toBe(201);
    expect(res.body.slug).toBe('test-problem');
  });

  it('/api/v1/problems/:slug (GET) - should return problem', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/problems/test-problem');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Problem');
  });

  it('/api/v1/problems/:slug (DELETE) - should delete problem', async () => {
    const res = await request(app.getHttpServer()).delete('/api/v1/problems/test-problem');
    expect(res.status).toBe(200);
    expect(res.body.slug).toBe('test-problem');
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

    const res = await request(app.getHttpServer())
      .post('/api/v1/problems')
      .send(invalidProblem);

    expect(res.status).toBe(400);
    expect(res.body.message).toContain('name should not be empty');
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

    const res = await request(app.getHttpServer())
      .post('/api/v1/problems')
      .send(invalidProblem);

    expect(res.status).toBe(400);
    expect(res.body.message).toContain(
      'difficulty must be one of the following values: EASY, MEDIUM, HARD',
    );
  });

  it('/api/v1/problems/:slug (GET) - should return 404 for non-existent problem', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/problems/invalid-slug');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Problem with slug "invalid-slug" not found');
  });

  it('/api/v1/problems/:slug (DELETE) - should return 404 for non-existent problem', async () => {
    const res = await request(app.getHttpServer()).delete('/api/v1/problems/invalid-slug');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Problem with slug "invalid-slug" not found');
  });

  it('/api/v1/problems/:slug (GET) - should return 404 for invalid slug format', async () => {
    const res = await request(app.getHttpServer()).get('/api/v1/problems/invalid#slug');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Problem with slug "invalid" not found');
  });

  afterAll(async () => {
    await app.close();
  });
});
