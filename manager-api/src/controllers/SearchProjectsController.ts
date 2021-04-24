import { Request, Response } from 'express';
import { getCustomRepository, Not } from 'typeorm';
import { ProjectRepository } from '../repositories/ProjectsRepository';
import { UserRepository } from '../repositories/UserRepository';

class SearchProjectsController {
  // async search(request: Request, response: Response) {

  // }

  async headerFilters(request: Request, response: Response) {
    const { id } = request.params;
    
    const projectsRepository = getCustomRepository(ProjectRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      id
    })

    const total = await projectsRepository.find({
      relations: ["user"],
      where: {
        user: user,
      }
    });

    const developing = await projectsRepository.find({
      relations: ["user"],
      where: {
        user: user,
        status: 1
      }
    });

    const finished = await projectsRepository.find({
      relations: ["user"],
      where: {
        user: user,
        status: 3
      }
    })

    const totalProjects = total.length;
    const totalDeveloping = developing.length;
    const totalFinished = finished.length;

    return response.status(200).json({
      total,
      totalProjects,
      totalDeveloping,
      totalFinished
    });
    
  }


}

export { SearchProjectsController };