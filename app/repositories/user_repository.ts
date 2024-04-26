import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'

export default class UserRepository implements PortUserRepository {
  async create(data: any): Promise<User> {
    return User.create(data)
  }

  async update(id: number, data: any): Promise<User | null> {
    const user = await User.find(id)
    if (!user) throw new Error('User not found')
    if (user) {
      user.merge(data)
      return user.save()
    }
    return null
  }

  async delete(id: number): Promise<void> {
    const user = await User.find(id)
    if (user) {
      return await user.delete()
    }
  }

  async findByName(name: string): Promise<User | null> {
    return User.findBy('name', name)
  }

  async findUsersWithMembers(): Promise<User[]> {
    return User.query().preload('memberships')
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
