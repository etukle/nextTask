import request from 'supertest';
import http from 'http';
import app from '../src/server';

test('Should pass healtcheck', async () => {
    const res = await request(app).get('/api/ping');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('pong');
});

test('Should get rows from db', async () => {
    const pl = {
        search_term: 'Best',
        offset: 0
    };

    const res = await request(app).post('/api/search').send(pl);
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
});
