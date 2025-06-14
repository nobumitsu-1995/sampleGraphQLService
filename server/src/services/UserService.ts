import { Service } from 'typedi'
import { User } from '../schema/types/User';
import { NotFoundError } from '../errors/CustomGraphQLError';

@Service()
export class UserService {
  async findById(id: string): Promise<User | null> {
    if (id === "1") return { id: "1", name: "Alice", age: 30, posts: [] } as User;
    if (id === "2") return { id: "2", name: "Bob", age: 24, posts: [] } as User;
    throw new NotFoundError(`User with ID: ${id} not found.`)
  }

  async findByIds(ids: readonly string[]): Promise<User[]> {
    return ids.map(id => {
      if (id === "1") return { id: "1", name: "Alice", age: 30, posts: []} as User
      if (id === "2") return { id: "2", name: "Bob", age: 24, posts: []} as User
        return null;
    }).filter(u => u!== null)
  }

  async getFriends(userId: string): Promise<User[]> {
    if (userId === "1") {
      return [
        { id: "3", name: "Charlie", age: 35, posts: [] } as User,
      ]
    }

    return []
  }
}