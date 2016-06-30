import path from 'path';
import fs from 'fs';

const certificate = process.env.SERVER_CRT ?
  fs.readFileSync(path.join(__dirname, process.env.SERVER_CRT)).toString() : undefined;

const privateKey = process.env.SERVER_KEY ?
  fs.readFileSync(path.join(__dirname, process.env.SERVER_KEY)).toString() : undefined;

export {
  privateKey,
  certificate,
};
