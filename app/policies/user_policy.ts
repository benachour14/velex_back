import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  list(user: User): AuthorizerResponse {
    console.log(user.role)
    return user.role === 'ADMIN'
  }
  view(user: User, profile: User): AuthorizerResponse {
    return user.id === profile.id
  }

  create(user: User): AuthorizerResponse {
    return true
  }
}
