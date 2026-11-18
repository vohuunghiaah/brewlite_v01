import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('BrewLite API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
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

      const productMap = new Map(
        response.body.map((p: { id: string; badge?: string }) => [p.id, p]),
      );
      expect(productMap.get('coffee-001')?.badge).toBe('Bán chạy');
      expect(productMap.get('coffee-003')?.badge).toBe('Mới');
      expect(productMap.get('tea-001')?.badge).toBe('Yêu thích');
      expect(productMap.get('coffee-004')?.badge).toBe('Hot Trend');
    });
  });

  describe('Task 6: POST /orders', () => {
    it('POST /orders -> 201 Created, trả về mã đơn và trạng thái PENDING', async () => {
      const response = await request(app.getHttpServer())
        .post('/orders')
        .send({
          items: [
            {
              productId: 'coffee-004',
              size: 'L',
              toppings: ['Kem cheese'],
              qty: 1,
            },
          ],
        })
        .expect(201);

      expect(response.body.id).toMatch(/^ORD-\d{8}-[0-9A-F]{4}$/);
      expect(response.body.status).toBe('PENDING');
      // Cold Brew Muối (42.000) + Size L (12.000) + Kem cheese (10.000) = 64.000
      expect(response.body.total).toBe(64000);
      expect(response.body.items).toHaveLength(1);
      expect(response.body.items[0].productName).toBe('Cold Brew Muối');
      expect(response.body.items[0].unitPrice).toBe(64000);
      expect(response.body.items[0].lineTotal).toBe(64000);
    });

    it('POST /orders -> 400 Bad Request khi giỏ hàng rỗng hoặc sai dữ liệu', async () => {
      await request(app.getHttpServer())
        .post('/orders')
        .send({ items: [] })
        .expect(400);

      await request(app.getHttpServer())
        .post('/orders')
        .send({
          items: [{ productId: 'coffee-001', size: 'XL', qty: 0 }],
        })
        .expect(400);

      await request(app.getHttpServer())
        .post('/orders')
        .send({
          items: [
            {
              productId: 'coffee-001',
              size: 'M',
              toppings: ['Topping lạ'],
              qty: 1,
            },
          ],
        })
        .expect(400);

      await request(app.getHttpServer())
        .post('/orders')
        .send({
          items: [{ productId: 'non-existing-product', size: 'M', qty: 1 }],
        })
        .expect(400);
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
