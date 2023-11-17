import { NextFunction, Request, Response } from 'express';
import { Board } from '../types';

export const validateBoardParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const board: Board = req.body.board;

    if (!Array.isArray(board) || board.length !== 9) {
        return res.status(400).json({ error: 'Invalid board parameters' });
    }

    next();
};

export const validateResultParams = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { result } = req.body;

    if (!['victories', 'defeats', 'draws'].includes(result)) {
        return res.status(400).json({ error: 'Invalid result' });
    }

    next();
};
