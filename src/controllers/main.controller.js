import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const main = (req,res)=>{
    const rutaHtml= path.resolve(__dirname,'../views/private/index.html')

    res.sendFile(rutaHtml)
};
