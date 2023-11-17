import mongodb from 'mongoose';

const gameSchema = new mongodb.Schema({
    results: {
        victories: { type: Number, default: 0 },
        defeats: { type: Number, default: 0 },
        draws: { type: Number, default: 0 },
    },
});

const Game = mongodb.model('Game', gameSchema);

export default Game;
