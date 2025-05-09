import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import * as dotenv from 'dotenv';
import { HttpError } from 'src/common/errors/http-error';
import { ExecutorResponse } from 'src/executor/executor.service';

dotenv.config({ path: '.env.test' });

const isWindows = process.platform === 'win32';
const binDir = './test-bin';

function getExecutable(name: string) {
  return `${binDir}/${name}${isWindows ? '.exe' : '.out'}`;
}

describe('Execute API (e2e)', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

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

  it('/api/v1/execute (POST) - should return output on valid exe path', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('echo'),
        input: 'Hello World',
      });

    const body = res.body as ExecutorResponse;
    expect(res.status).toBe(201);
    expect(body.output).toBeDefined(); // Check for 'output'
    expect(body.output).toBe('Hello World');
    expect(body.exitCode).toBeDefined(); // Ensure exitCode exists
    expect(body.exitCode).toBe(0);
  });

  it('/api/v1/execute (POST) - should return 500 for non-existent executable path', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('nonexistent'), // Non-existent executable
        input: 'Hello World',
      });

    const body = res.body as HttpError;
    expect(res.status).toBe(500);
    expect(body.message).toBeDefined();
    expect(body.message).toContain('Executable path is invalid');
  });

  it('/api/v1/execute (POST) - should return bad request', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('echo'), // Ensure this executable exists
        // No input provided
      });

    expect(res.status).toBe(400);
  });

  it('/api/v1/execute (POST) - should return 400 for missing exePath', async () => {
    const res = await request(server).post('/api/v1/execute').send({
      // exePath is missing
      input: 'Some input',
    });

    expect(res.status).toBe(400);
  });

  it('/api/v1/execute (POST) - should return 400 for invalid input type', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('echo'), // Valid exePath
        input: { key: 'value' }, // Invalid input type (object instead of string)
      });

    const body = res.body as HttpError;
    expect(res.status).toBe(400); // Expecting a validation error (400)
    expect(body.message).toContain('input must be a string'); // Error message should indicate invalid input type
  });

  it('/api/v1/execute (POST) - should return empty stdout, empty stderr, and exitCode 0 for silent executable', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('silent'), // Path to a valid executable that does not produce output
        input: 'Hello World',
      });
    const body = res.body as ExecutorResponse;
    expect(res.status).toBe(201);
    expect(body.output).toBe('');
  });

  it('/api/v1/execute (POST) - should return empty output', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('echo'), // Path to a valid executable that accepts an empty input string
        input: '', // Empty input string
      });

    const body = res.body as ExecutorResponse;
    expect(res.status).toBe(201);
    expect(body.output).toBe('');
  });

  it('/api/v1/execute (POST) - developer issue should return 400', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('echo'),
        input: 123,
      });

    expect(res.status).toBe(400);
  });

  it('/api/v1/execute (POST) - multiple inputs', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('sum'),
        input: '1 5',
      });

    const body = res.body as ExecutorResponse;
    expect(res.status).toBe(201);
    expect(body.output).toBe('6');
  });
  it('/api/v1/execute (POST) - nonzero exitcode', async () => {
    const res = await request(server)
      .post('/api/v1/execute')
      .send({
        exePath: getExecutable('nonzero'),
        input: '1 0',
      });

    const body = res.body as ExecutorResponse;
    expect(res.status).toBe(201);
    expect(body.output).toBe('ERROR');
    expect(body.exitCode).toBeGreaterThan(0);
  });

  afterAll(async () => {
    await app.close();
  });
});
