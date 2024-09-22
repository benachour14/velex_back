import ClubService from '#services/club_service'
import { clubValidator } from '#validators/club_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

@inject()
export default class ClubsController {
  constructor(protected clubService: ClubService) {}

  async index({}: HttpContext) {
    try {
      const clubs = await this.clubService.getAllClubs()
      return clubs
    } catch (error) {
      return { error: error }
    }
  }

  async show({ params }: HttpContext) {
    try {
      const club = await this.clubService.getClubById(params.id)
      return club
    } catch (error) {
      return { error: error }
    }
  }

  async listOfEvents({ params }: HttpContext) {
    try {
      const event = await this.clubService.eventsOfClubs(params.id)

      return event
    } catch (error) {
      return { error: error }
    }
  }

  async create({ request, response, auth }: HttpContext) {
    const data = request.all()
    const payload = await clubValidator.validate(data)

    const user = auth?.user
    if (!user) return response.forbidden('You need to be authenticated')
    try {
      const club = await this.clubService.createClub(payload)

      // add the user that created the club as admin member
      await this.clubService.addCreatorOfClub(club.id, user.id)
      return club
    } catch (error) {
      return { error: error }
    }
  }

  async update({ params, request }: HttpContext) {
    const data = request.all()
    const payload = await clubValidator.validate(data)

    try {
      const club = await this.clubService.updateClubById(params.id, payload)
      return club
    } catch (error) {
      return { error: error }
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      await this.clubService.deleteClubById(params.id)
      return { success: true }
    } catch (error) {
      return { error: error }
    }
  }

  async addMember({ params, request, response }: HttpContext) {
    const { memberId } = request.all()
    if (!memberId) return response.badRequest('User ID is required')

    try {
      const result = await this.clubService.addMemberToClub(params.id, memberId)
      if (result)
        return response.ok({
          ...result,
          msg: 'New Member added',
        })
    } catch (error) {
      return { error: error }
    }
  }

  async updateRoleMember({ params, request, response }: HttpContext) {
    const { memberIds, newRole } = request.all()
    if (!memberIds || !Array.isArray(memberIds) || !newRole)
      return response.badRequest('Members array and new role are required')

    try {
      const result = await this.clubService.updateMembersRole(params.id, memberIds, newRole)
      return response.ok({ msg: 'Role of memberIds were updated' })
    } catch (error) {
      console.log(error)
      return response.notAcceptable({ msg: 'Failed to update members role from club' })
    }
  }

  async removeMember({ params, request, response }: HttpContext) {
    const { memberIds } = request.all()
    if (!memberIds || !Array.isArray(memberIds))
      return response.badRequest('User IDs array is required')

    try {
      const results = await Promise.all(
        memberIds.map((memberId) => this.clubService.removeMemberFromClub(params.id, memberId))
      )
      return { success: true, results }
    } catch (error) {
      return response.notAcceptable({ msg: 'Failed to remove member from club' })
    }
  }
}
