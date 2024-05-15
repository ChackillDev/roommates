import Router from 'express'
const gastosRouter = Router();
import { leerGastos, nuevoGasto, editarGasto, eliminarGasto } from '../controllers/gastos.controller.js';

gastosRouter.get('/gastos', leerGastos);
gastosRouter.post('/gasto', nuevoGasto);
gastosRouter.put('/gasto', editarGasto);
gastosRouter.delete('/gasto', eliminarGasto);


export default gastosRouter;
