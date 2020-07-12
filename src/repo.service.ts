import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import Project from './db/models/project.entity';
import Language from './db/models/language.entity';

@Injectable()
export default class RepoService {
  public constructor(
    @InjectRepository(Project)
    public readonly projectRepo: Repository<Project>,

    @InjectRepository(Language)
    public readonly languageRepo: Repository<Language>,
  ) {}
}
