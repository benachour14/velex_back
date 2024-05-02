// user-repository.test.ts
import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'
import UserRepository from '#repositories/user_repository'
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeUserRepository } from '../base.js'

// Mocking the User model

test('UserRepository', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })

  test('create a user', async ({ expect }) => {
    const userData = { name: 'John', email: 'john@example.com', password: 'password' }
    const createdUser = { id: 1, ...userData }

    const result = await userRepository.create(userData)

    expect(result).toEqual(createdUser)
    expect(User.create).toHaveBeenCalledWith(userData)
  })

  // Write other test cases for other methods of UserRepository following a similar pattern
})
