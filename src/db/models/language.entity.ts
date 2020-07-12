import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Project from './project.entity';

@ObjectType()
@Entity({ name: 'languages' })
export default class Language {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ name: 'project_id' })
  projectId: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  label: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Field(() => Project)
  project: Project;

  // Associations
  @ManyToOne(
    () => Project,
    project => project.languageConnection,
    { primary: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'project_id' })
  projectConnection: Promise<Project>;
}
