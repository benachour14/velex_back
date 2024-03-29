import User from '#models/user'
import Club from '#models/club'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class ClubPolicy extends BasePolicy {

    public async viewList(user: User): Promise<AuthorizerResponse> {

        return true
    }
    public async view(user: User, club: Club): Promise<AuthorizerResponse> {

        return true
    }

    public async create(user: User): Promise<AuthorizerResponse> {

        return true
    }

    public async update(user: User, club: Club): Promise<AuthorizerResponse> {
        // check if the user is a menber and if  admin of the club
        if (user.memberships && user.memberships.find(membership => membership.id === club.id && membership.$extras.role === 'admin')) {
            return true
        }
        return false
    }
}