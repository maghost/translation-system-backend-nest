import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from 'src/repo.service';
import Project from 'src/db/models/project.entity';
import ProjectInput from './input/project.input';

@Resolver()
export default class ProjectResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Project])
  public async getProjects(): Promise<Project[]> {
    return this.repoService.projectRepo.find();
  }

  @Query(() => Project, { nullable: true })
  public async getProject(@Args('id') id: number): Promise<Project> {
    return this.repoService.projectRepo.findOne(id);
  }

  @Mutation(() => Project)
  public async createProject(
    @Args('data') input: ProjectInput,
  ): Promise<Project> {
    const project = this.repoService.projectRepo.create({ name: input.name });
    return this.repoService.projectRepo.save(project);
  }
}
