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
  test('deleteUserById should delete the user when it exists', async ({ assert }) => {
    const fakeUser = {
      id: 1,
      email: 'test@example.com',
      password: 'password',
    }

    class FakeUserRepository extends PortUserRepository {
      findById(id: any): Promise<User | null> {
        return Promise.resolve(fakeUser as User)
      }

      delete(): Promise<void> {
        // Implement the delete method logic here
        return Promise.resolve()
      }
    }

    const userService = new UserService(new FakeUserRepository())

    await userService.deleteUserById(fakeUser.id)

    // Assert that the delete method was called
    /*  assert.isTrue() */
  })

  test('deleteUserById should not throw an error when the user does not exist', async ({
    assert,
  }) => {
    const fakeUser = {
      id: 0,
      email: 'test@example.com',
      password: 'password',
    }

    class FakeUserRepository extends PortUserRepository {
      findById(id: any): Promise<User | null> {
        return Promise.resolve(null)
      }
    }

    const userService = new UserService(new FakeUserRepository())

    await userService.deleteUserById(fakeUser.id)

    // Assert that the delete method was not called
    /*  assert.isFalse() */
  })

  test('deleteUserById should throw an error when the user does not exist', async ({ assert }) => {
    const fakeUser = {
      id: 0,
      email: 'test@example.com',
      password: 'password',
    }

    class FakeUserRepository extends PortUserRepository {
      findById(id: any): Promise<User | null> {
        return Promise.resolve(null)
      }
    }

    const userService = new UserService(new FakeUserRepository())

    try {
      await userService.deleteUserById(fakeUser.id)
      assert.fail('Expected an error to be thrown')
    } catch (error) {
      assert.equal(error.message, 'User not found')
    }
  })
})
