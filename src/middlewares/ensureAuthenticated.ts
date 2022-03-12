import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  // Receber token
  const authToken = request.headers.authorization;

  // Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end(); // O end pega a mensagem padrão desse código
  }

  const [, token] = authToken.split(' '); // Bearer i4ewu4was5doiru... (splitando no espaço e ignorando Bearer)

  try {
    // Validar se o token é válido (não expirou e etc)
    const { sub } = verify(token, process.env.SECRET_HASH!) as IPayload; // Forçando a função verify a receber esse IPayload que sabemos que é uma string (sem isso, daria erro)

    request.user_id = sub; // sub seria referente a subject (src/servicesAuthenticateUserService.ts - linha 39)

    return next();
  } catch (err) {
    return response.status(401).end();
  }

};
