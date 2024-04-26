import PortUserRepository from '#repositories/interfaces/user_interface'
import { test } from '@japa/runner'
import { FakeUserRepository } from './base.js'
import app from '@adonisjs/core/services/app'
import UserService from '#services/user_service'
import exp from 'constants'
import { expect } from '@japa/expect'

test.group('login user', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })

  test('should login user', async ({ assert }) => {
    const fakeUser = {
      email: 'fake@gmail.com',
      password: '123456',
    }
    const userService = new UserService(new FakeUserRepository())
    const user = await userService.login(fakeUser)
    assert.deepEqual(user, {
      type: 'bearer',
      value: 'oat_OQ.QVQxVk9JUERFeGhVdjVLUlg2VUhEMi1uTGo5U3FTVHRTRXJSUXZILTE1OTg0MjExODM',
    })
  })

  test('should not login user with invalid credential', async ({ expect }) => {
    const fakeUser = {
      email: 'ge@gmail.com',
      password: '123456',
    }

    class FakeUserRepository extends PortUserRepository {
      async verifyCredentials(email: string, password: string): Promise<any> {
        return null
      }
    }

    const userService = new UserService(new FakeUserRepository())

    await expect(userService.login(fakeUser)).rejects.toThrow('Invalid credentials')
  })

  test('should not login user with invalid email', async ({ expect }) => {
    const fakeUser = {
      email: null,
      password: '',
    }

    const userService = new UserService(new FakeUserRepository())

    await expect(userService.login(fakeUser)).rejects.toThrow('Email and password are required')
  })

  test('should throw an error if password is not provided', async ({ expect }) => {
    const fakeUser = {
      email: 'test@example.com',
      password: '',
    }

    const userService = new UserService(new FakeUserRepository())

    await expect(userService.login(fakeUser)).rejects.toThrow('Email and password are required')
  })

  app.container.restore(UserService)
})
