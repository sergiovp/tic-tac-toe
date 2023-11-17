import Game from '../models/game';
import { Result } from '../types';

const getRank = async () => {
    try {
        let game = await Game.findOne();

        if (!game) {
            game = new Game();
            await game.save();
        }

        return game;
    } catch (error) {
        throw new Error('An error occurred when getting the rank');
    }
};

const updateRank = async (result: Result) => {
    try {
        let game = await Game.findOne();

        if (!game) {
            game = new Game();
        }

        if (game.results) {
            game.results[result] += 1;
        } else {
            throw new Error('Invalid result');
        }

        await game.save();
        return game;
    } catch (error) {
        throw new Error('An error occurred when updating the rank');
    }
};

export default {
    getRank,
    updateRank,
};
