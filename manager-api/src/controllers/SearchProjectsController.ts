import { Request, Response } from 'express';
import { getCustomRepository, ILike, Equal, Raw, Like, Between, In, Any } from 'typeorm';
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
      start_date 
    } = request.query;

    // console.log(typeof(start_date))

    // let newDate = new Date(start_date.toString())

    // console.log(typeof(newDate))
    // console.log(newDate)

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
        start_date: start_date ?  Any([`%${start_date}%`, `%${start_date}%`]) : ILike('%`')
      }
    });

    // const total = await projectsRepository.createQueryBuilder()
    // .where('creator_id = :id', { id })
    // // .andWhere('status = :status', { status })
    // .andWhere('start_date = :start_date', { start_date })
    // .getMany()

    return response.status(200).json({
      total,
    });

  }

}

export { SearchProjectsController };