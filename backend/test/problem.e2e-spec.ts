import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Problems API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe()); // to match production behavior
    await app.init();
  });

  // Valid GET request (should return list)
  it('/problems (GET) - should return list', async () => {
    const res = await request(app.getHttpServer()).get('/problems');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Valid POST request (create new problem)
  it('/problems (POST) - create new problem', async () => {
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
      .post('/problems')
      .send(newProblem);
    expect(res.status).toBe(201);
    expect(res.body.slug).toBe('test-problem');
  });

  // Valid GET request (should return problem)
  it('/problems/:slug (GET) - should return problem', async () => {
    const res = await request(app.getHttpServer()).get('/problems/test-problem');
    expect(res.status).toBe(200);
    expect(res.body.name).toBe('Test Problem');
  });

  // Valid DELETE request (should delete problem)
  it('/problems/:slug (DELETE) - should delete problem', async () => {
    const res = await request(app.getHttpServer()).delete('/problems/test-problem');
    expect(res.status).toBe(200);
    expect(res.body.slug).toBe('test-problem');
  });

  // Invalid POST request (Missing required field)
  it('/problems (POST) - should return 400 for invalid data (missing name)', async () => {
    const invalidProblem = {
      slug: 'invalid-problem',
      difficulty: 'EASY',
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Test Description',
      iconPath: '/icons/test.png',
    };

    const res = await request(app.getHttpServer())
      .post('/problems')
      .send(invalidProblem);
    
    expect(res.status).toBe(400);  // Validation should fail
    expect(res.body.message).toContain('name should not be empty');  // Validation error message
  });

  // Invalid POST request (Invalid difficulty value)
  it('/problems (POST) - should return 400 for invalid difficulty', async () => {
    const invalidProblem = {
      name: 'Invalid Difficulty Problem',
      slug: 'invalid-difficulty',
      difficulty: 'SUPER_EASY', // Invalid difficulty value
      points: 10,
      exePath: '/bin/test.exe',
      description: 'Test Description',
      iconPath: '/icons/test.png',
    };

    const res = await request(app.getHttpServer())
      .post('/problems')
      .send(invalidProblem);
    
    expect(res.status).toBe(400);  // Validation should fail
    expect(res.body.message).toContain('difficulty must be one of the following values: EASY, MEDIUM, HARD');

  });

  // Invalid GET request (Problem not found)
  it('/problems/:slug (GET) - should return 404 for non-existent problem', async () => {
    const res = await request(app.getHttpServer()).get('/problems/invalid-slug');
    expect(res.status).toBe(404);  // Problem with 'invalid-slug' should not exist
    expect(res.body.message).toBe('Problem with slug "invalid-slug" not found'); // Error message
  });

  // Invalid DELETE request (Trying to delete non-existent problem)
  it('/problems/:slug (DELETE) - should return 404 for non-existent problem', async () => {
    const res = await request(app.getHttpServer()).delete('/problems/invalid-slug');
    expect(res.status).toBe(404);  // Trying to delete a problem that does not exist
    expect(res.body.message).toBe('Problem with slug "invalid-slug" not found'); // Error message
  });

  // Invalid GET request (Invalid slug format)
  it('/problems/:slug (GET) - should return 400 for invalid slug format', async () => {
    const res = await request(app.getHttpServer()).get('/problems/invalid#slug');
    expect(res.status).toBe(404);  // Invalid slug format should result in a 404
    expect(res.body.message).toBe('Problem with slug \"invalid\" not found'); // Error message
  });

  afterAll(async () => {
    await app.close();
  });
});
