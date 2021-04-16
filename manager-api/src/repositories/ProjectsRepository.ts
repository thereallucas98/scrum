import { EntityRepository, Repository } from 'typeorm';
import { Projects } from '../models/Project';

@EntityRepository(Projects)
class ProjectRepository extends Repository<Projects> {};

export { ProjectRepository };