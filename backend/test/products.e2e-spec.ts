import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('Products (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /products — returns 200 OK and valid products JSON list', async () => {
    const res = await request(app.getHttpServer())
      .get('/products')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);

    for (const item of res.body) {
      expect(item).toHaveProperty('id');
      expect(typeof item.id).toBe('string');
      expect(item.id.length).toBeGreaterThan(0);

      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
      expect(item.name.length).toBeGreaterThan(0);

      expect(item).toHaveProperty('price');
      expect(typeof item.price).toBe('number');
      expect(Number.isInteger(item.price)).toBe(true);
      expect(item.price).toBeGreaterThanOrEqual(0);

      expect(item).toHaveProperty('imageUrl');
      expect(typeof item.imageUrl).toBe('string');
      expect(item.imageUrl.length).toBeGreaterThan(0);
    }
  });

  it('GET /products — accessible publicly without JWT or Authorization header', async () => {
    await request(app.getHttpServer())
      .get('/products')
      .expect(200);
  });

  it('GET / (Task 1 regression check) — still returns 200 OK and greeting message', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello BrewLite API');
  });
});
