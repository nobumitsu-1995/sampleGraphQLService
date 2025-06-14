import { Service } from "typedi"
import { Post } from "../schema/types/Post"
import { User } from "../schema/types/User"
import { PostStatus } from "../schema/enums/PostStatus"

@Service()
export class PostService {
  async findByAuthorIds(ids: readonly string[]): Promise<Post[]> {
    return [
      new Post({
        id: '1',
        title: '',
        author: new User('1', 'hoge', [],),
        categories: [],
        status: PostStatus.PUBLISHED
      })
    ]
  }
}