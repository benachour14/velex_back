import User from '#models/user'
import PortUserRepository from '#repositories/interfaces/user_interface'
import UserService from '#services/user_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeUserRepository } from './base.js'

test.group('add user', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })

  test('should add user to the user array', async ({ assert }) => {
    const fakeUser = {
      fullName: 'aa',
      email: 'fake@gmail.com',
      password: '123456',
      password_confirmation: '123456',
    }
    const userService = new UserService(new FakeUserRepository())
    const user = await userService.createUser(fakeUser)
    assert.deepEqual(user, fakeUser)
  })

  test('should throw a error if create user with a existing email', async ({ expect }) => {
    const fakeUser = {
      fullName: 'aa',
      email: '',
      password: '123456',
      password_confirmation: '123456',
    }
    class FakeUserRepository extends PortUserRepository {
      create(data: any): Promise<User> {
        throw new Error('Email already exists')
      }
    }
    const userService = new UserService(new FakeUserRepository())

    await expect(() => userService.createUser(fakeUser)).rejects.toThrow('Email already exists')
  })

  test('should throw a error if create user without a password', async ({ expect }) => {
    const fakeUser = {
      fullName: 'aa',
      email: '',
    }
    class FakeUserRepository extends PortUserRepository {
      create(data: any): Promise<User> {
        throw new Error('Password is required')
      }
    }
    const userService = new UserService(new FakeUserRepository())

    await expect(() => userService.createUser(fakeUser)).rejects.toThrow('Password is required')
  })
  test('should throw a error if create user without a email', async ({ expect }) => {
    const fakeUser = {
      fullName: 'aa',
      email: '',
    }
    class FakeUserRepository extends PortUserRepository {
      create(data: any): Promise<User> {
        throw new Error('Email is required')
      }
    }
    const userService = new UserService(new FakeUserRepository())

    await expect(() => userService.createUser(fakeUser)).rejects.toThrow('Email is required')
  })

  app.container.restore(UserService)
})
