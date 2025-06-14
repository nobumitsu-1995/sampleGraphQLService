import { Arg, Args, Ctx, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { User } from "../schema/types/User";
import { Post } from "../schema/types/Post";
import { connectionFromArraySlice } from "graphql-relay";
import { UserService } from "../services/UserService";
import { MyContext } from "../context";

@Resolver(of => User)
export class UserResolver {
  constructor(
    private userService: UserService
  ) {}

  @Query(returns => User, { nullable: true, description: "IDからユーザーを取得する" })
  async user(
    @Arg("id", type => ID) id: string,
    @Ctx() {dataloaders}: MyContext
  ): Promise<User | null> {
    return dataloaders.userByIdLoader.load(id)
  }

  @FieldResolver(returns => [Post], { description: "ユーザーの投稿を取得する" })
  async posts(
    @Root() user: User,
    @Ctx() {dataloaders}: MyContext
  ): Promise<Post[]> {
    return dataloaders.postsByUserIdLoader.load(user.id)
  }

  @FieldResolver(returns => UserConnection, { description: "ユーザーの友達リスト" })
  async friends(
    @Root() user: User,
    @Args() { first, after, last, before }: { first?: number, after?: string, last?: number, before?: string },
    @Ctx() {dataloaders}: MyContext
  ): Promise<UserConnection> {
    const allFriends = await this.userService.getFriends(user.id)
    const totalCount = allFriends.length

    const connection = connectionFromArraySlice(
      allFriends,
      { first, after, last, before },
      { arrayLength: totalCount, sliceStart: 0 }
    )

    return {
      edges: connection.edges,
      pageInfo: connection.pageInfo,
      totalCount
    }
  }
}