import { Request, Response } from 'express';
import chooseMove from '../utils/chooseMove';
import { determineWinner } from '../utils/game';
import getErrorMessage from '../utils/getErrorMessage';
import gameService from '../services/gameService';

const move = (req: Request, res: Response) => {
    try {
        const { board, challenge } = req.body;
        const nextMove = chooseMove(board, challenge);
        res.status(200).send({ nextMove });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred when choosing the next move',
        });
    }
};

const isWinner = (req: Request, res: Response) => {
    try {
        const { board } = req.body;
        const winner = determineWinner(board);
        res.status(200).send({ winner });
    } catch (error) {
        res.status(500).json({
            error: 'An error occurred when checking winner',
        });
    }
};

const getRank = async (_req: Request, res: Response) => {
    try {
        const rank = await gameService.getRank();
        res.status(200).json(rank);
    } catch (error) {
        res.status(500).json({
            error: getErrorMessage(error),
        });
    }
};

const updateRank = async (req: Request, res: Response) => {
    try {
        const { result } = req.body;
        const rank = await gameService.updateRank(result);
        res.status(200).json(rank);
    } catch (error) {
        res.status(500).json({
            error: getErrorMessage(error),
        });
    }
};

export default {
    move,
    isWinner,
    getRank,
    updateRank,
};
