import { Field, ID, Int, ObjectType } from "type-graphql";
import { Post } from "./Post";
import { Node } from "../interfaces/Node";

@ObjectType({ description: "アプリケーションのユーザーを指す" })
export class User extends Node {
  @Field({ description: "ユーザーのフルネーム" })
  name: string

  @Field(type => Int, { description: "ユーザーの年齢(オプション)" })
  age?: number

  @Field(type => [Post], { description: "ユーザーによって作成された投稿のリスト" })
  posts: Post[]

  constructor (id: string, name: string, posts: Post[]) {
    super(id)
    this.name = name,
    this.posts = posts
  }
}