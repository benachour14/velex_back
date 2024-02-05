import Club from '#models/club'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClubsController {
  /**
   * Show all clubs
   */
  async index({}: HttpContext) {
    const clubs = await Club.all()
    return clubs
  }

  /**
   * Show individual club
   */
  async show({ params }: HttpContext) {}

  /**
   * Create new club
   */
  async create({ request }: HttpContext) {
    const data = request.all()
    const club = await Club.create(data)
    return club
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
