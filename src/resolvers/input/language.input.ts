import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class LanguageInput {
  @Field()
  readonly projectId: number;

  @Field()
  readonly name: string;

  @Field()
  readonly label: string;
}
