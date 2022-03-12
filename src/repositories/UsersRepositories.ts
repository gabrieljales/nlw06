import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
class UsersRepositories extends Repository<User> { }

export { UsersRepositories };

// Repositórios é a camada que faz a relação da entidade com a base de dados, são os responsáveis por terem os métodos que vão manipular o banco de dados (busca, inserção e etc). Sempre que um serviço ou middleware precisar conferir alguma informação no banco, devemos usar os repositórios