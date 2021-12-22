import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test Image Processing API', () => {
  it('Should always respond by redirect from index to /api endpoint', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(302);
    done();
  });

  it('Should always find /api endpoint', async (done) => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });
});
