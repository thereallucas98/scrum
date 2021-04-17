import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProjectRepository } from '../repositories/ProjectsRepository';
import { UserRepository } from '../repositories/UserRepository';


class ProjectsController {
  async create(request: Request, response: Response) {
    const {
      name,
      description,
      viability,
      status,
      price,
      start_date,
      expected_finished_date,
      responsible
    } = request.body;

    const userRepository = getCustomRepository(UserRepository);
    const projectRepository = getCustomRepository(ProjectRepository);

    const user = await userRepository.findOne({
      id: responsible
    });

    const project = projectRepository.create({
      name,
      description,
      viability,
      status,
      price,
      start_date,
      expected_finished_date,
      finished_date: null,
      user,
    });

    await projectRepository.save(project).then((res) => {
      return response.status(200).json({
        res
      });
    }).catch((error) => {
      console.log(error);
    })
  }

  async list(request: Request, response: Response) {
    const projectsRepository = getCustomRepository(ProjectRepository);

    const all = await projectsRepository.find({ 
      order: {
        viability: "DESC",
      }
    })

    return response.status(201).json(all);
  }

  async edit(request: Request, response: Response) {
    const { id } = request.params;

    const {
      description,
      viability,
      status,
    } = request.body;

    if (status === 2 || status === 3) {

    }

    const data = {
      description,
      viability,
      status,
    }
  }
}

export { ProjectsController };