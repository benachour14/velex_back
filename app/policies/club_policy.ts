import User from '#models/user'
import Club from '#models/club'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ClubPolicy extends BasePolicy {
  async viewList(): Promise<AuthorizerResponse> {
    return true
  }
  async view(): Promise<AuthorizerResponse> {
    return true
  }

  async create(): Promise<AuthorizerResponse> {
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
