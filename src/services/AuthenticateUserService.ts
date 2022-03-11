import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from '../repositories/UsersRepositories';


interface IAuthenticateRequest {
  email: string,
  password: string,
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if (!user) {
      // Segurança para a aplicação (não diz explicitamente qual está incorreto)
      throw new Error('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password); // retorna um bool

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }

    // Dica: Se ficar na dúvida entre usar ou não o await, veja o retorno
    // (o sign retorna uma string, enquanto o compare() acima retorna uma Promise<boolean> e por isso usa-se o await)
    const secretHash = process.env.SECRET_HASH;

    // Como secret hash também pode ser undefined, o TS não deixa utilizar ela no sign sem antes tratar
    if (secretHash) {
      const token = sign({
        email: user.email
      }, secretHash, {
        subject: user.id,
        expiresIn: "1d"
      });

      return token;
    } else {
      throw new Error('SECRET_HASH is not defined in .env!!')
    }
  }
}

export { AuthenticateUserService };