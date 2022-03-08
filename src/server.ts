import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { router } from './routes';

import "./database";

const app = express();

app.use(express.json());

app.use(router);

// Middleware para tratar erros. OBS: Depois mudar, criar em um diretório separado e especificar mais erros além do 400
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({
        error: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
);

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