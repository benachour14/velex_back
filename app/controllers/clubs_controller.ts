import Club from '#models/club'
import ClubService from '#services/club_service'
import { clubValidator } from '#validators/club_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

inject()
export default class ClubsController {
  constructor(protected clubService: ClubService) {}
  /**
   * Show all clubs
   */
  async index({}: HttpContext) {
    const clubs = await this.clubService.getAllClubs()
    return clubs
  }

  /**
   * Show individual club
   */
  async show({ params }: HttpContext) {
    const club = await this.clubService.getClubById(params.id)
    return club
  }

  /**
   * Create new club
   */
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

  /**
   * Edit individual record
   */
  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {
    try {
      const club = await this.clubService.getClubById(params.id)
      return club
    } catch (error) {
      return { error: error }
    }
  }

  /**
   * Handle form submission for the edit action
   */
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

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    try {
      await this.clubService.deleteClubById(params.id)
      return { success: true }
    } catch (error) {
      return { error: error }
    }
  }
}
