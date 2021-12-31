import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test Image Processing API routes', async (): Promise<void> => {
  it('Should responsed with instructions to the user', async (done) => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    done();
  });

  it('Should always find /api endpoint', async (done): Promise<void> => {
    const response = await request.get('/api');
    expect(response.status).toBe(200);
    done();
  });
});
