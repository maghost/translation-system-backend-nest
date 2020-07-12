import { Field, InputType } from '@nestjs/graphql';

@InputType()
class LanguageInput {
  @Field()
  readonly projectId: number;

  @Field()
  readonly name: string;

  @Field()
  readonly label: string;
}

@InputType()
class DeleteLanguageInput {
  @Field()
  readonly id: number;
}

export { LanguageInput, DeleteLanguageInput };
