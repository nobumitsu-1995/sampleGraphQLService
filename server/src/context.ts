import { createPostByUserIdLoader, createUserByIdLoader } from "./dataloaders/userDataloaders"
import { Container } from 'typedi'
import { UserService } from "./services/UserService"
import { PostService } from "./services/PostService"

export interface MyContext {
  req: Request
  res: Response
  dataloaders: {
    userByIdLoader: ReturnType<typeof createUserByIdLoader>
    postsByUserIdLoader: ReturnType<typeof createPostByUserIdLoader>
  }
}

export const createContext = ({ req, res }: { req: Request, res: Response }): MyContext => {
  const userService = Container.get(UserService)
  const postService = Container.get(PostService)

  return {
    req,
    res,
    dataloaders: {
      userByIdLoader: createUserByIdLoader(userService),
      postsByUserIdLoader: createPostByUserIdLoader(postService)
    }
  }
}