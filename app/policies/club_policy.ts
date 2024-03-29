import User from '#models/user'
import Club from '#models/club'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ClubPolicy extends BasePolicy {
  async viewList(user: User): Promise<AuthorizerResponse> {
    return true
  }
  async view(user: User, club: Club): Promise<AuthorizerResponse> {
    return true
  }

  async create(user: User): Promise<AuthorizerResponse> {
    return true
  }

  async update(user: User, club: Club): Promise<AuthorizerResponse> {
    // check if the user is a menber and if  admin of the club
    if (
      user.memberships &&
      user.memberships.find(
        (membership) => membership.id === club.id && membership.$extras.pivot_role === 'ADMIN'
      )
    ) {
      return true
    }
    return false
  }
}
