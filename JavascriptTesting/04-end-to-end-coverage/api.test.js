const { describe, it } = require('mocha');
const request = require('supertest');
const app = require('./api');
const { deepStrictEqual, ok } = require('assert');

describe('API - Suite Test', () => {
  describe('/contact', () => {
    it('should request the contact page and return HTTP Status Code 200', async () => {
      const response = await request(app)
        .get('/contact')
        .expect(200);

      deepStrictEqual(response.text, 'Contact Us page');
    });
  });

  describe('/login', () => {
    it('should login successfully on the login route and return HTTP Status Code 200', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'admin', password: 'admin' })
        .expect(200);

      deepStrictEqual(response.text, 'Loggin has succeeded');
    });

    it('should unhautorize a request when requesting it wrong credentials and return HTTP Status Code 401', async () => {
      const response = await request(app)
        .post('/login')
        .send({ username: 'user', password: 'user' })
        .expect(401);

      ok(response.unauthorized)
      deepStrictEqual(response.text, 'Loggin has failed');
    });
  });

  describe('/inexistent', () => {
    it('should request an inexistent route and redirect to /not-found', async () => {
      const response = await request(app)
        .get('/inexistent')
        .expect(404);

      deepStrictEqual(response.text, 'Not found!');
    });
  });
});