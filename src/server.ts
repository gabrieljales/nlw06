import 'reflect-metadata';
import express from 'express';

import { router } from './routes';

import "./database";

const app = express();

app.use(express.json());

app.use(router);

const port = process.env.API_PORT;

app.listen(port, () => console.log(`Server is running on ${port}!`));

/**
 * Tipos de parâmetros:
 * Routes params: => http://localhost:3000/produtos/8217389
 * Query params: => http://localhost:3000/produtos?name=teclado&decor=preto
 * 
 * Body params => {
 *  "name": "teclado",
 *  "cor": 'preto"
 * }
 */