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

  @Mutation(() => Language, { nullable: true })
  public async createLanguage(
    @Args('data') input: LanguageInput,
  ): Promise<Language> {
    const project = await this.repoService.projectRepo.findOne(input.projectId);

    if (!project) {
      return null;
    }

    const language = this.repoService.languageRepo.create({
      projectId: input.projectId,
      name: input.name.toLowerCase().trim(),
      label: input.label,
    });

    return this.repoService.languageRepo.save(language);
  }

  @Mutation(() => Language, { nullable: true })
  public async deleteLanguage(
    @Args('data') input: DeleteLanguageInput,
  ): Promise<Language> {
    const language = await this.repoService.languageRepo.findOne(input.id);

    if (!language) {
      return null;
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
