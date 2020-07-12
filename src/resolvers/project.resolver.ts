import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import RepoService from 'src/repo.service';
import Project from 'src/db/models/project.entity';
import { ProjectInput, DeleteProjectInput } from './input/project.input';

@Resolver(() => Project)
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
    const { name } = input;
    const project = this.repoService.projectRepo.create({ name });

    return this.repoService.projectRepo.save(project);
  }

  @Mutation(() => Project)
  public async deleteProject(
    @Args('data') input: DeleteProjectInput,
  ): Promise<Project> {
    const { id } = input;
    const project = await this.repoService.projectRepo.findOne(id);

    if (!project) {
      throw new Error(`Project with ID #${id} does not exist.`);
    }

    const copy = { ...project };

    await this.repoService.projectRepo.remove(project);

    return copy;
  }
}
