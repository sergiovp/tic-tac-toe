import { Router } from 'express';
import gameController from '../controllers/gameController';
import {
    validateBoardParams,
    validateResultParams,
} from '../middlewares/gameParams';

const router = Router();

router.post('/move', validateBoardParams, gameController.move);

router.post('/winner', validateBoardParams, gameController.isWinner);

router.get('/rank', gameController.getRank);

router.patch('/rank', validateResultParams, gameController.updateRank);

export default router;
