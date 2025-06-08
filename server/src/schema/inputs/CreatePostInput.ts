import { Field, ID, InputType } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

type Args = {
  title: string
  content?: string
  authorId: string
  categoryIds?: string[]
}

@InputType({ description: "新しい投稿を作成するための入力" })
export class CreatePostInput {
  @Field()
  @MinLength(5, { message: "タイトルは5文字以上にしてください" })
  @MaxLength(100, { message: "タイトルは100文字以内にしてください" })
  title: string

  @Field({ nullable: true })
  @MaxLength(5000, { message: "本文は1000文字以内にしてください" })
  content?: string

  @Field(type => ID)
  authorId: string

  @Field(type => [ID], { nullable: true, description: "投稿のカテゴリのIDのリスト" })
  categoryIds?: string[]

  constructor(args: Args) {
    this.title = args.title
    this.content = args.content
    this.authorId = args.authorId
    this.categoryIds = args.categoryIds
  }
}