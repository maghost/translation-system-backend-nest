import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import * as ormOptions from './config/orm';
import RepoModule from './repo.module';

import ProjectResolver from './resolvers/project.resolver';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const gqlImports = [ProjectResolver];

@Module({
  imports: [
    TypeOrmModule.forRoot(ormOptions),
    RepoModule,
    ...gqlImports,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
