const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig');

describe('the route handlers', () => {
    describe('get /', () => {
        // check status code
        it('responds with 200', async () => {
            const response = await request(server).get('/');

            expect(response.status).toBe(200);
            //when test pass, try breaking it, change status or endpoint
        });

        it('responds with json', async () => {
            const response = await request(server).get('/');

            expect(response.type).toMatch(/json/i);
            //when test pass, try breaking it, change status or endpoint
        });

        it('sends correct response object', async () => {
            const response = await request(server).get('/');

            expect(response.body).toEqual({api: 'up' });
            //when test pass, try breaking it, change status or endpoint
        });
    });

    describe('get /hobbits', () => {
        // check status code
        it('responds with 201', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.status).toBe(200);
            //when test pass, try breaking it, change status or endpoint
        });
        // check type
        it('responds with json', async () => {
            const response = await request(server).get('/hobbits');

            expect(response.type).toMatch(/json/i);
            //when test pass, try breaking it, change status or endpoint
        });
        // check body
        it('sends correct response object', async () => {
            const response = await request(server).get('/hobbits');

            //WHICH database?
            expect(response.body).toEqual([]);
            //when test pass, try breaking it, change status or endpoint
        });
    });

    describe('post /hobbits', () => {

        afterEach(async () => {
            await db('hobbits').truncate();
        });

        it('responds with 201 when body is correct', async () => {
            const body = { name: 'bilbo' };
            const response = await request(server)
                .post('/hobbits')
                .send(body);

            expect(response.status).toBe(201);
            //when test pass, try breaking it, change status or endpoint
        });

        it('responds with an array containing new id', async () => {
            const body = { name: 'jimmy'};
            const response = await request(server)
                .post('/hobbits')
                .send(body);

            expect(response.body.length).toBe(1);
            //when test pass, try breaking it, change status or endpoint
            
        });

        it('responds with 400 when body is missing data', async () => {
            const body = {};
            const response = await request(server)
                .post('/hobbits')
                .send(body);

            expect(response.status).toBe(400);
            //when test pass, try breaking it, change status or endpoint
        });
    })
})
