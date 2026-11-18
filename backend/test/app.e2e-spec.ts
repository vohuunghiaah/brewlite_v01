import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'node:crypto';

describe('BrewLite API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Task 1 Regression: GET /', () => {
    it('/ (GET) should return 200 and "Hello BrewLite API"', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect('Hello BrewLite API');
    });
  });

  describe('Task 2: GET /products', () => {
    it('/products (GET) should return 200 OK and application/json', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    it('/products (GET) should return a non-empty array of valid products without requiring JWT', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);

      for (const item of response.body) {
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

    it('/products (GET) should include wireframe products (Cà phê sữa đá, Americano, Cappuccino nóng, Trà đào cam sả)', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      const productNames = response.body.map((p: { name: string }) => p.name);
      expect(productNames).toContain('Cà phê sữa đá');
      expect(productNames).toContain('Americano');
      expect(productNames).toContain('Cappuccino nóng');
      expect(productNames).toContain('Trà đào cam sả');
      expect(productNames).toContain('Cold Brew Muối');
      expect(productNames).toContain('Bánh sừng bò sô-cô-la');
    });

    it('/products (GET) should have all unique product IDs', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      const ids = response.body.map((p: { id: string }) => p.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it('/products (GET) should include verified Figma badges', async () => {
  const response = await request(app.getHttpServer())
    .get('/products')
    .expect(200);

  const productMap = new Map<
    string,
    { id: string; badge?: string }
  >(
    response.body.map(
      (p: { id: string; badge?: string }) =>
        [p.id, p] as const,
    ),
  );

  expect(productMap.get('coffee-001')?.badge).toBe('Bán chạy');
  expect(productMap.get('coffee-003')?.badge).toBe('Mới');
  expect(productMap.get('tea-001')?.badge).toBe('Yêu thích');
  expect(productMap.get('coffee-004')?.badge).toBe('Hot Trend');
    });
  });

  describe('Task 7: Authentication API', () => {
    const createEmail = () => `e2e-${randomUUID()}@example.com`;
    const password = 'Password123!';

    it('POST /auth/register should register a new user', async () => {
      const email = createEmail();

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email, password })
        .expect(201);

      expect(response.body.message).toBe('Đăng ký thành công');
      expect(response.body.user.email).toBe(email);
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.createdAt).toBeDefined();
      expect(response.body.user).not.toHaveProperty('passwordHash');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('POST /auth/register should reject duplicate email', async () => {
      const email = createEmail();

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email, password })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email, password })
        .expect(400);

      expect(response.body.message).toBe('Email đã được đăng ký');
    });

    it('POST /auth/login should return a valid JWT', async () => {
      const email = createEmail();

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email, password })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password })
        .expect(201);

      expect(response.body.message).toBe('Đăng nhập thành công');
      expect(response.body.accessToken).toBeDefined();
      expect(response.body.tokenType).toBe('Bearer');
      expect(response.body.user.email).toBe(email);

      const payload = await app
        .get(JwtService)
        .verifyAsync(response.body.accessToken);

      expect(payload.email).toBe(email);
      expect(payload.sub).toBe(response.body.user.id);
    });

    it('POST /auth/login should reject incorrect password', async () => {
      const email = createEmail();

      await request(app.getHttpServer())
        .post('/auth/register')
        .send({ email, password })
        .expect(201);

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password: 'WrongPassword123!' })
        .expect(401);

      expect(response.body.message).toBe(
        'Email hoặc mật khẩu không chính xác',
      );
    });

    it('POST /auth/login should reject unknown email', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: createEmail(),
          password,
        })
        .expect(401);

      expect(response.body.message).toBe(
        'Email hoặc mật khẩu không chính xác',
      );
    });
  });


  afterEach(async () => {
    await app.close();
  });
});
