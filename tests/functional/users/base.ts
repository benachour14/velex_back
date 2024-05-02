import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'

export const fakeUser = [
  {
    id: 1,
    fullName: 'aa',
    email: 'fake@gmail.com',
    password: '123456',
  },
  {
    id: 2,
    fullName: 'bb',
    email: 'fake@gmail.com',
    password: '123456',
  },
]

export class FakeUserRepository extends PortUserRepository {
  async find(): Promise<User[]> {
    return fakeUser as User[]
  }
  async create(item: Partial<User>): Promise<User> {
    return (await item) as User
  }
  async update(id: any, item: Partial<User>): Promise<User> {
    return item as User
  }
  async delete(id: any): Promise<User> {
    throw new Error('Method not implemented.')
  }
  async findById(id: any): Promise<User | null> {
    return fakeUser[id] as User
  }
  async findByName(name: string): Promise<User | null> {
    throw new Error('Method not implemented.')
  }
  findUsersWithMembers(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }
  async verifyCredentials(email: string, password: string): Promise<User | null> {
    return { ...fakeUser[0] }
  }
  async createToken(user: User): Promise<any> {
    return 'oat_OQ.QVQxVk9JUERFeGhVdjVLUlg2VUhEMi1uTGo5U3FTVHRTRXJSUXZILTE1OTg0MjExODM'
  }
}
