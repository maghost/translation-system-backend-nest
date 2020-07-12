import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';

import RepoService from 'src/repo.service';
import Language from 'src/db/models/language.entity';
import LanguageInput from './input/language.input';
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
    const language = this.repoService.languageRepo.create({
      projectId: input.projectId,
      name: input.name.toLowerCase().trim(),
      label: input.label,
    });

    return this.repoService.languageRepo.save(language);
  }

  @ResolveField(() => Project, { name: 'project' })
  public async getProject(@Parent() parent: Language): Promise<Project> {
    return this.repoService.projectRepo.findOne(parent.projectId);
  }
}
