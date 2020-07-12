import {
  Args,
  Mutation,
  Query,
  Resolver,
  ResolveProperty,
} from '@nestjs/graphql';

import RepoService from 'src/repo.service';
import Language from 'src/db/models/language.entity';
import LanguageInput from './input/language.input';

@Resolver()
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
      name: input.name,
      label: input.label,
    });

    return this.repoService.languageRepo.save(language);
  }
}
