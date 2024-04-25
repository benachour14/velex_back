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
      if (error.code === '23505') {
        throw new Exception('Email already exists')
      } else {
        throw new Exception(error.message)
      }
    }
  }

  async login(data: any) {
    const user = await this.userRepository.verifyCredentials(data.email, data.password)

    if (!user) {
      return { error: 'Invalid credentials' }
    }

    const token = await this.userRepository.createToken(user)

    return {
      type: 'bearer',
      value: token.value!.release(),
    }
  }

  async updateUserById(id: number, data: any) {
    let user = await this.userRepository.findById(id)
    if (!user) throw new Error('User not found')
    user = await this.userRepository.update(id, data)
    return user
  }

  async deleteUserById(id: number) {
    const user = await this.userRepository.find(id)
    return await user?.delete()
  }

  async getUserById(id: number) {
    try {
      return await this.userRepository.find(id)
    } catch (error) {
      throw new Error('User not found')
    }
  }
  async getAllUsers() {
    return await this.userRepository.all()
  }
}
