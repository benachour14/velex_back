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
})
