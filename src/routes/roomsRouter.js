import Router from 'express'
const roomsRouter = Router();
import { leerRouter, nuevoRouter } from '../controllers/rooms.controller.js';

roomsRouter.get('/roommates', leerRouter);
roomsRouter.post('/roommate', nuevoRouter);

export default roomsRouter;
