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

  async create({ request }: HttpContext) {
    const data = request.all()
    const payload = await clubValidator.validate(data)

    try {
      const club = await this.clubService.createClub(payload)
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
}
