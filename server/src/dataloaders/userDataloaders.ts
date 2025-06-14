import DataLoader from "dataloader";
import { Post } from "../schema/types/Post";
import { User } from "../schema/types/User";
import { UserService } from "../services/UserService";
import { PostService } from "../services/PostService";

const batchUsersByIds = async (
  ids: readonly string[],
  userService: UserService
): Promise<(User | Error)[]> => {
  const users: User[] = await userService.findByIds(ids)
  const userMap = new Map<string, User>()
  users.forEach(user => {
    userMap.set(user.id, user)
  })

  return ids.map(id => {
    const user = userMap.get(id)
    return user ? user : new Error(`User with id ${id} not found`)
  })
}

const batchPostsByUserIds = async (
  userIds: readonly string[],
  postService: PostService
): Promise<(Post[] | Error)[]> => {
  const posts: Post[] = await postService.findByAuthorIds(userIds)
  const postsByUserId = new Map<string, Post[]>()

  posts.forEach(post => {
    const userPosts = postsByUserId.get(post.author.id) || []
    userPosts.push(post);
    postsByUserId.set(post.author.id, userPosts)
  })

  return userIds.map(id => postsByUserId.get(id) || [])
}

export const createUserByIdLoader = (userService: UserService) =>
  new DataLoader<string, User>(keys => batchUsersByIds(keys, userService))

export const createPostByUserIdLoader = (postService: PostService) =>
  new DataLoader<string, Post[]>(keys => batchPostsByUserIds(keys, postService))
