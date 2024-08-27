import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { fakeUser, FakeUserRepository } from './base.js'

test.group('search user', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })
  test('getUserById should return the user when it exists', async ({ expect }) => {
    const userService = new UserService(new FakeUserRepository())
    const user = await userService.getUserById(1)

    expect(user).toBeInstanceOf(User)
    expect(user).toHaveProperty('id')
    expect(user?.id).toBe(2)
    expect(user).toEqual(fakeUser[0])
  })
  test('getUserById should throw an error when the user does not exist', async ({ expect }) => {
    const userService = new UserService(new FakeUserRepository())

    await expect(userService.getUserById(0)).rejects.toThrow('User not found')
  })
  test('getAllUsers should return all users', async ({ expect }) => {
    const userService = new UserService(new FakeUserRepository())
    const users = await userService.getAllUsers()

    expect(users).toBeInstanceOf(Array)
    expect(users).toEqual(fakeUser)
  })
})
