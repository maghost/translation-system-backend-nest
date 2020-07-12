import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import RepoService from './repo.service';
import Project from './db/models/project.entity';
import Language from './db/models/language.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Project, Language])],
  providers: [RepoService],
  exports: [RepoService],
})
export default class RepoModule {}
