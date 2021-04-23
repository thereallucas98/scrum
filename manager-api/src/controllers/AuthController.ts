import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {
  async authenticate(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      can_create,
    } = request.body;

    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findOne({
      email
    });
    

    if (!user) {
      return response.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return response.status(401);
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    delete user.password;

    return response.json({
      user,
      token,
    });

  }
}

export default new AuthController();