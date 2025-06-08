import { createUnionType } from "type-graphql";
import { Post } from "../types/Post";
import { User } from "../types/User";

export const SearchResultUnion = createUnionType({
  name: "SearchResult",
  types: () => [Post, User],
  resolveType: value => {
    if("name" in value) {
      return User
    }
    if ("title" in value) {
      return Post
    }
    return undefined
  }
})