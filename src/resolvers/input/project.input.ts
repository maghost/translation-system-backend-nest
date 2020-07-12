import { Field, InputType } from '@nestjs/graphql';

@InputType()
class ProjectInput {
  @Field()
  readonly name: string;
}

@InputType()
class DeleteProjectInput {
  @Field()
  readonly id: number;
}

export { ProjectInput, DeleteProjectInput };
