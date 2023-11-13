import { Router } from 'express';
import controller from '../controllers/controller';

const router = Router();

router.get('/health', controller.getHealth);

export default router;
