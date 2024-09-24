import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import logger from '@adonisjs/core/services/logger'
export default class UserPolicy extends BasePolicy {
  view(user: User, profile: User): AuthorizerResponse {
    return user.id === profile.id || user.role === 'ADMIN'
  }

  list(user: User): AuthorizerResponse {
    return user.role === 'ADMIN'
  }
  create(user: User): AuthorizerResponse {
    return true
  }

  update(user: User, idToUpdate: number): AuthorizerResponse {
    const admin = user.role === 'ADMIN'
    return user.id === idToUpdate || admin
  }

  delete(user: User, idDeleted: number): AuthorizerResponse {
    console.log('1')
    // console.log(user)
    const admin = user.role === 'ADMIN'

    return user.id === idDeleted || admin
  }
}
