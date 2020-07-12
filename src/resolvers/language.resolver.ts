import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import RepoService from 'src/repo.service';
import Language from 'src/db/models/language.entity';
import { LanguageInput, DeleteLanguageInput } from './input/language.input';
import Project from 'src/db/models/project.entity';

@Resolver(() => Language)
export default class LanguageResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [Language])
  public async getLanguages(): Promise<Language[]> {
    return this.repoService.languageRepo.find();
  }

  @Query(() => [Language])
  public async getLanguageFromProject(
    @Args('projectId') projectId: number,
  ): Promise<Language[]> {
    return this.repoService.languageRepo.find({
      where: { projectId },
    });
  }

  @Query(() => Language, { nullable: true })
  public async getLanguage(@Args('id') id: number): Promise<Language> {
    return this.repoService.languageRepo.findOne(id);
  }

  @Mutation(() => Language)
  public async createLanguage(
    @Args('data') input: LanguageInput,
  ): Promise<Language> {
    const { projectId, name, label } = input;
    const project = await this.repoService.projectRepo.findOne(projectId);

    if (!project) {
      throw new Error(`Project with ID #${projectId} does not exist.`);
    }

    const language = this.repoService.languageRepo.create({
      projectId,
      name: name.toLowerCase().trim(),
      label,
    });

    return this.repoService.languageRepo.save(language);
  }

  @Mutation(() => Language)
  public async deleteLanguage(
    @Args('data') input: DeleteLanguageInput,
  ): Promise<Language> {
    const { id } = input;
    const language = await this.repoService.languageRepo.findOne(id);

    if (!language) {
      throw new Error(`Language with ID #${id} does not exist.`);
    }

    const copy = { ...language };

    await this.repoService.languageRepo.remove(language);

    return copy;
  }

  @ResolveField(() => Project, { name: 'project' })
  public async getProject(@Parent() parent: Language): Promise<Project> {
    return this.repoService.projectRepo.findOne(parent.projectId);
  }
}
