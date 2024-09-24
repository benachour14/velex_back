import User from '#models/user'
import BaseRepository from './base_interface.js'

export default abstract class PortUserRepository implements BaseRepository<User> {
  abstract find(): Promise<Partial<User[]>>
  abstract create(item: Partial<User>): Promise<User>
  abstract update(id: any, item: Partial<User>): Promise<User | null>
  abstract delete(id: any): Promise<void>
  abstract findById(id: any): Promise<User | null>
  abstract findByName(name: string): Promise<User | null>
  abstract findUsersWithMembers(): Promise<User[]>
  abstract verifyCredentials(email: string, password: string): Promise<User | null>
  abstract createToken(user: User): Promise<any>
}
