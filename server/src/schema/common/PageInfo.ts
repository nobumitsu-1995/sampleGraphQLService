import { Field, ObjectType } from "type-graphql";

type Args = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  endCursor?: string | null
  startCursor?: string | null
}

@ObjectType({ description: "コネクション内のページネーションに関する情報" })
export class PageInfo {
  @Field(type => Boolean, { description: "次のページが存在するかどうか" })
  hasNextPage: boolean

  @Field(type => Boolean, { description: "前のページが存在するかどうか" })
  hasPreviousPage: boolean

  @Field(type => String, { nullable: true, description: "現在ページの最後のアイテムカーソル" })
  endCursor?: string | null

  @Field(type => String, { nullable: true, description: "現在ページの最初のアイテムカーソル" })
  startCursor?: string | null

  constructor(args: Args) {
    this.hasNextPage = args.hasNextPage
    this.hasPreviousPage = args.hasPreviousPage
    this.endCursor = args.endCursor
    this.startCursor = args.startCursor
  }
}