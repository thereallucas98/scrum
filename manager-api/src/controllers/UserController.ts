import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      can_create,
    } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if (userAlreadyExists) {
      return response.status(409).json({
        error: 'User Already Exists',
      });
    }

    const user = userRepository.create({
      name,
      email,
      password,
      can_create
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  async edit(request: Request, response: Response) {
    const { id } = request.params;

    const {
      name,
      email,
      password,
      can_create
    } = request.body;

    const data = { 
      name,
      email,
      password,
      can_create
    }

    const userRepository = getCustomRepository(UserRepository);

    await userRepository.update(id, data);

    const userUpdate = await userRepository.findOne({
      id
    });

    return response.status(200).json(userUpdate);
  }

  async list(request: Request, response: Response) {
    const usersRepository = getCustomRepository(UserRepository);

    const allUsers = await usersRepository.find();

    return response.status(201).json(allUsers);
  }

  async GetAnUser(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getCustomRepository(UserRepository);

    const getUser = await usersRepository.findOneOrFail(id);

    return response.status(200).json({
      getUser
    })

    // console.log(id);

    // return response.status(201).json({
    //   id: id
    // })
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const usersRepository = getCustomRepository(UserRepository);

    const getUser = await usersRepository.findOne(id);

    console.log(getUser);

    if (getUser != undefined) {
      await usersRepository.delete(id).then((res) => {
        return response.status(200).json({
          message: 'Usuário deletado com sucesso!'
        })
      }).catch((error) => {
        console.log(error);
      })
    } else {
      return response.status(400).json({
        message: 'usuário não existe no banco!'
      })
    }

    


  }
}

export { UserController };