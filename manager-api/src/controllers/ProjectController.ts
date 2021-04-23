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

  async test(request: Request, response: Response) {
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

    await projectRepository.save(project)

    let counter = 1;
    while (counter < 10) {
      const project = projectRepository.create({
        name:`${name} #${counter}`,
        description,
        viability,
        status,
        price,
        start_date,
        expected_finished_date,
        finished_date: null,
        user,
      });

      await projectRepository.save(project) 
      counter++
    }

    return response.status(200).json({
      message: 'Project and Sub Projects was created!'
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

    const projectsRepository = getCustomRepository(ProjectRepository);

    const projectVerified = await projectsRepository.findOneOrFail({
      id
    });

    console.log(projectVerified);

    if (projectVerified.status == 2 || projectVerified.status == 3) {
      return response.status(401).json({
        message: 'Projeto está com status de Cancelado ou Concluído, logo não pode ser alterado!'
      })

    } else {
      const data = {
        description,
        viability,
        status,
      }

      console.log('É mudou!')
      await projectsRepository.update(id, data);
      const projectUpdated = await projectsRepository.findOneOrFail(id);
      return response.status(200).json({
        projectUpdated
      });
    }


    
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const projectsRepository = getCustomRepository(ProjectRepository);

    const getProject = await projectsRepository.findOne(id);

    console.log(getProject);

    if (getProject != undefined) {
      await projectsRepository.delete(id).then((res) => {
        return response.status(200).json({
          message: 'Project deleted'
        });
      }).catch((error) => {
        console.log(error);
      });
    } else {
      return response.status(400).json({
        message: 'User does NOT exist in database'
      });
    }
  }
}

export { ProjectsController };