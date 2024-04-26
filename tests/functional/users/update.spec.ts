import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeUserRepository } from './base.js'
import { Exception } from '@adonisjs/core/exceptions'

test.group('update user', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })
  test('should throw an error if user does not exist', async ({ expect }) => {
    const fakeUser = {
      id: 0,
      email: 'test@example.com',
      password: 'password',
    }

    class FakeUserRepository extends PortUserRepository {
      updateById(data: any): Promise<User> {
        throw new Exception('User not found')
      }

      findById(id: any): Promise<User | null> {
        return Promise.resolve(null)
      }
    }

    const userService = new UserService(new FakeUserRepository())

    await expect(userService.updateUserById(fakeUser.id, fakeUser)).rejects.toThrow(
      'User not found'
    )
  })

  test('should update the user when valid data is provided', async ({ expect }) => {
    const fakeUser = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
    }

    const updatedData = {
      email: 'updated@example.com',
      password: 'updatedpassword',
    }

    const userService = new UserService(new FakeUserRepository())

    const updatedUser = await userService.updateUserById(fakeUser.id, updatedData)

    expect(updatedUser).toHaveProperty('email')
    expect(updatedUser?.email).toBe(updatedData.email)
    expect(updatedUser).toHaveProperty('password')
    expect(updatedUser?.password).toBe(updatedData.password)
  })

  test('should throw a error if required field a empty or null', async () => {})

  app.container.restore(UserService)
})
