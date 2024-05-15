import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataGastos = path.resolve(__dirname, '../assets/gastos.json')

export const leerGastos = (req, res) => {
  try {
    const gastosJSON = JSON.parse(fs.readFileSync(dataGastos, "utf-8"));
    res.status(200).send(gastosJSON);
  } catch (error) {
    res.status(404);
    console.error('Error leyendo los datos:', err);
  }
}

export const nuevoGasto = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    const reqGastos = {
      id: uuidv4().slice(30),
      roommate,
      descripcion,
      monto,
    };
    const { gastos } = JSON.parse(fs.readFileSync(dataGastos, "utf-8"));
    gastos.push(reqGastos);
    fs.writeFileSync(dataGastos, JSON.stringify({ gastos }));
    res.status(201).send();
  } catch (error) {
    res.status(404);
    console.log('No se ha ingresado nuevo gasto', error);
  }
};

export const editarGasto = async (req, res) => {
  try {
    const { id } = req.query;
    const { roommate, descripcion, monto } = req.body;
    const gasto = { id, roommate, descripcion, monto }
    const gastosJSON = JSON.parse(fs.readFileSync(dataGastos, "utf-8"));
    const gastos = gastosJSON.gastos;

    gastosJSON.gastos = gastos.map((g) => g.id === id ? gasto : g);
    fs.writeFileSync(dataGastos, JSON.stringify(gastosJSON));
    res.status(201).send();
  }
  catch {
    res.status(500).send("Algo salió mal")
  }
};

export const eliminarGasto = async (req, res) => {
  try {
    const { id } = req.query;
    const gastosJSON = JSON.parse(fs.readFileSync(dataGastos, "utf-8"));
    const gastos = gastosJSON.gastos;
    gastosJSON.gastos = gastos.filter((g) => g.id !== id);
    fs.writeFileSync(dataGastos, JSON.stringify(gastosJSON));
    res.status(205).send();
  }
  catch {
    res.status(500).send("Algo salió mal")
  }
}
