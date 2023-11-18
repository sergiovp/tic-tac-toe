import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../app';
import connectDB from '../../db/connection';

describe('GET and PATCH /game/rank', () => {
    beforeAll(async () => {
        await connectDB();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    let initialRankData: {
        results: { victories: number; defeats: number; draws: number };
    };

    it('Should return rank data', async () => {
        const res = await request(app).get('/game/rank');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('results');
        initialRankData = res.body;
    });

    it('Should update rank data when adding victory', async () => {
        const res = await request(app)
            .patch('/game/rank')
            .send({ result: 'victories' });

        expect(res.status).toBe(200);
        expect(res.body.results.victories).toBe(
            initialRankData.results.victories + 1,
        );
        expect(res.body.results.defeats).toBe(initialRankData.results.defeats);
        expect(res.body.results.draws).toBe(initialRankData.results.draws);
    });

    it('Should update rank data when adding defeat', async () => {
        const res = await request(app)
            .patch('/game/rank')
            .send({ result: 'defeats' });

        expect(res.status).toBe(200);
        expect(res.body.results.victories).toBe(
            initialRankData.results.victories + 1,
        );
        expect(res.body.results.defeats).toBe(
            initialRankData.results.defeats + 1,
        );
        expect(res.body.results.draws).toBe(initialRankData.results.draws);
    });

    it('Should update rank data when adding draw', async () => {
        const res = await request(app)
            .patch('/game/rank')
            .send({ result: 'draws' });

        expect(res.status).toBe(200);
        expect(res.body.results.victories).toBe(
            initialRankData.results.victories + 1,
        );
        expect(res.body.results.defeats).toBe(
            initialRankData.results.defeats + 1,
        );
        expect(res.body.results.draws).toBe(initialRankData.results.draws + 1);
    });

    it('Should handle error when payload is wrong', async () => {
        const res = await request(app)
            .patch('/game/rank')
            .send({ result: 'invalidResult' });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('POST /game/winner', () => {
    it('Should return null if there is no a winner', async () => {
        const res = await request(app)
            .post('/game/winner')
            .send({
                board: ['X', 'O', null, null, null, null, null, null, null],
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('winner');
        expect(res.body.winner).toBe(null);
    });

    it('Should return "O" if the winner is "O" player', async () => {
        const res = await request(app)
            .post('/game/winner')
            .send({
                board: ['O', 'O', 'O', null, null, null, null, null, null],
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('winner');
        expect(res.body.winner).toBe('O');
    });

    it('Should return "X" if the winner is "X" player', async () => {
        const res = await request(app)
            .post('/game/winner')
            .send({
                board: ['X', 'X', 'X', null, null, null, null, null, null],
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('winner');
        expect(res.body.winner).toBe('X');
    });

    it('Should handle errors if board is invalid', async () => {
        const res = await request(app)
            .post('/game/winner')
            .send({
                board: ['X', 'X', 'X'],
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});

describe('/game/move', () => {
    it('Should return a valid move (between 0 and 1)', async () => {
        const res = await request(app)
            .post('/game/move')
            .send({
                board: [null, null, null, null, null, null, null, null, null],
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('nextMove');
        expect(res.body.nextMove).toBeGreaterThanOrEqual(0);
        expect(res.body.nextMove).toBeLessThan(9);
    });

    it('Should handle errors when board is invalid', async () => {
        const res = await request(app)
            .post('/game/move')
            .send({
                board: [null, null, null],
            });

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('error');
    });
});
