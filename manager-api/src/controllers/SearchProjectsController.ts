import { Request, Response } from 'express';
import { getCustomRepository, ILike, Equal, Raw } from 'typeorm';
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
      order: {
        viability: "DESC",
        status: "ASC",
      },
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

  async filterSet(request: Request, response: Response) {
    const { id } = request.params;
    const {
      status, 
      viability, 
      // start_date 
    } = request.query;

    const projectsRepository = getCustomRepository(ProjectRepository);
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({
      id
    })

    const total = await projectsRepository.find({
      relations: ["user"],
      where: {
        user: user,
        viability: viability ? viability : ILike('%'),
        status: status ? status : ILike('%'),
        // start_date: start_date ?  Equal(new Date(start_date.toLocaleString())) : ILike('%')
      }
    });

    return response.status(200).json({
      total,
    });

  }

}

export { SearchProjectsController };