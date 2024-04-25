import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'

export default class UserRepository implements PortUserRepository {
  create(data: any): Promise<User> {
    return User.create(data)
  }

  update(id: number, data: any): Promise<User | null> {
    const user = User.find(id)
    if (user) {
      user.merge(data)
      return user.save()
    }
    return null
  }

  delete(id: number): Promise<void> {
    const user = User.find(id)
    if (user) {
      return user.delete()
    }
  }

  async findByName(name: string): Promise<User | null> {
    return User.findOneBy('name', name)
  }

  async findUsersWithMembers(): Promise<User[]> {
    return User.query().with('members').fetch()
  }

  async findById(id: number): Promise<User | null> {
    return User.find(id)
  }

  async find(): Promise<User[]> {
    return await User.all()
  }

  async verifyCredentials(email: string, password: string): Promise<User | null> {
    return User.verifyCredentials(email, password)
  }

  async createToken(user: User): Promise<any> {
    const token = await User.accessTokens.create(user)

    return token.value!.release()
  }
}
