import Club from '#models/club'
import ClubService from '#services/club_service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'


inject()
export default class ClubsController {
  constructor(protected clubService: ClubService) { }
  /**
   * Show all clubs
   */
  async index({ }: HttpContext) {
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
    try {
      const club = await this.clubService.createClub(data)

      return club
    } catch (error) {
      return { error: error }
    }

  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
