import PortUserRepository from '#repositories/interfaces/user_interface'
import { test } from '@japa/runner'
import { FakeUserRepository } from './base.js'
import app from '@adonisjs/core/services/app'
import UserService from '#services/user_service'

test.group('login user', () => {
  app.container.swap(PortUserRepository, () => {
    return new FakeUserRepository()
  })

  test('should login user', async ({ assert }) => {
    const fakeUser = {
      email: '',
      password: '123456',
    }
    const userService = new UserService(new FakeUserRepository())
    const user = await userService.login(fakeUser)
    assert.deepEqual(user, {
      type: 'bearer',
      value: 'oat_OQ.QVQxVk9JUERFeGhVdjVLUlg2VUhEMi1uTGo5U3FTVHRTRXJSUXZILTE1OTg0MjExODM',
    })
  })

  app.container.restore(UserService)
})
