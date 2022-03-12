import { Request, Response } from 'express';
import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_receiver, message } = request.body;
    const { user_id } = request; // Usando id do usuário autenticado (assim ele é obrigado a se autenticar e n poderá manipular isso)

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_receiver,
      user_sender: user_id, // Disponível por causa do middleware ensureAuthenticated (linha 24)
      message,
    });

    return response.json(compliment);
  }
}

export { CreateComplimentController };