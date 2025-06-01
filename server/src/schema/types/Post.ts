import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User";
import { Category } from "./Category";
import { PostStatus } from "./PostStatus";

type Args = {
  id: string
  title: string
  author: User
  categories: Category[]
  status: PostStatus
}

@ObjectType({ description: "ブログ投稿を表します" })
export class Post {
  @Field(type => ID)
  id: string

  @Field()
  title: string

  @Field(type => User, { description: "投稿者" })
  author: User

  @Field(type => [Category], { description: "投稿のカテゴリ" })
  categories: Category[]

  @Field(type => PostStatus, { description: "投稿のステータス" })
  status: PostStatus

  constructor(args: Args) {
    this.id = args.id
    this.title = args.title
    this.author = args.author
    this.categories = args.categories
    this.status = args.status
  }
}