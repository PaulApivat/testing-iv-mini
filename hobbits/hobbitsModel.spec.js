// because posting hobbits didn't work coz no ids in post?
const hobbits = require('./hobbitsModel');
const db = require('../data/dbConfig.js');

describe('the hobbit model', () => {

    afterEach(async () => {
        await db('hobbits').truncate();
    });

    it('should insert new hobbits', async () => {
        const ids = await hobbits.insert({name: 'bilbo'});

            expect(ids.length).toBe(1);
            expect(ids[0]).toBe(1);
    })
})