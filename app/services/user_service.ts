import { inject } from '@adonisjs/core'
import PortUserRepository from '#repositories/interfaces/user_interface'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class UserService {
  constructor(protected userRepository: PortUserRepository) {}

  async createUser(data: any) {
    try {
      const user = await this.userRepository.create(data)

      //send a mail through a mail service

      return user
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async login(data: any) {
    if (!data.email || !data.password) throw new Exception('Email and password are required')
    const user = await this.userRepository.verifyCredentials(data.email, data.password)

    if (!user) {
      throw new Exception('Invalid credentials')
    }

    const token = await this.userRepository.createToken(user)

    return {
      type: 'bearer',
      value: token,
    }
  }

  async updateUserById(id: number, data: any) {
    let user = await this.userRepository.findById(id)
    if (!user) throw new Exception('User not found')
    user = await this.userRepository.update(id, data)
    return user
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.findById(id)
    if (!user) throw new Exception('User not found')
    return await this.userRepository.delete(id)
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findById(id)

    if (!user) throw new Exception('User not found')

    return user
  }
  async getAllUsers() {
    return await this.userRepository.find()
  }
}
