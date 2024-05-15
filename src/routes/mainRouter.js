import Router from 'express'
const router = Router();
import { main } from '../controllers/main.controller.js';

router.get('/', main)

export default router;
