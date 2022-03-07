import { getCustomRepository } from 'typeorm';
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserREquest {
  name: string;
  email: string;
  admin?: boolean;
}

class CreateUserService {
  async execute({ name, email, admin }: IUserREquest) {
    const usersRepository = getCustomRepository(UsersRepositories); // getCustomRepository é o responsável por instanciar o UsersRepositories (não poderia ser new UsersRepositories)

    if (!email) {
      throw new Error('Incorrect email');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = usersRepository.create({
      name,
      email,
      admin
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };

// Services: As regras de negócio da aplicação