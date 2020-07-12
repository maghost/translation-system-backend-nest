import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class ProjectInput {
  @Field()
  readonly name: string;
}
