import Event from '#models/event'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class EventPolicy extends BasePolicy {
  create(user: User, clubId: number): AuthorizerResponse {
    if (user.memberships) {
      const membership = user.memberships.find(
        (m) => m.id === clubId && m.$extras.pivot_role === 'ADMIN'
      )
      return !!membership
    }
    return false
  }

  update(user: User, event: Event): AuthorizerResponse {
    if (user.memberships) {
      const membership = user.memberships.find(
        (m) => m.id === event.club.id && m.$extras.pivot_role === 'ADMIN'
      )
      return !!membership
    }

    return false
  }

  delete(user: User, event: Event): AuthorizerResponse {
    if (user.memberships) {
      const membership = user.memberships.find(
        (m) => m.id === event.club.id && m.$extras.pivot_role === 'ADMIN'
      )
      return !!membership
    }

    return false
  }
}
