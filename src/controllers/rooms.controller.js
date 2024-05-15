import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataRMates = path.resolve(__dirname, '../assets/roommates.json')

export const leerRouter = (req,res)=>{
  try {
    const roommatesJSON = JSON.parse(fs.readFileSync(dataRMates, "utf-8"));
    res.status(200).json(roommatesJSON);
  } catch (error) {
    res.status(404);
    console.error('Error leyendo los datos:', err);
  }
}

export const nuevoRouter = async (req,res)=>{
  try {
    const { data } = await axios.get("https://randomuser.me/api")
    const randomRoommate = data.results[0];
    const roommate = {
            id: uuidv4().slice(30),
            nombre: `${randomRoommate.name.first} ${randomRoommate.name.last}`,
            debe: "",
            recibe: "",
    };
    const { roommates } = JSON.parse(fs.readFileSync(dataRMates, "utf-8"));
    roommates.push(roommate);
    fs.writeFileSync(dataRMates, JSON.stringify({ roommates }));
    res.status(200).send(data);

  } catch (error) {
    res.status(404);
    console.log('No se ha ingresado nuevo compañero(a)', error);
  }
};
