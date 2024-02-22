import { HttpContext } from '@adonisjs/core/http'

export default class EventsController {
  async index({ response }: HttpContext) {
    return response.json('events/index')
  }

  async create({ response }: HttpContext) {
    return response.json('events/create')
  }

  async store({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'location',
      'start_date',
      'end_date',
      'club_id',
    ])
  }

  async show({ response }: HttpContext) {
    return response.json('events/show')
  }

  async edit({ response }: HttpContext) {
    return response.json('events/edit')
  }

  async update({ request, response }: HttpContext) {
    const data = request.only([
      'title',
      'description',
      'location',
      'start_date',
      'end_date',
      'club_id',
    ])
  }

  async destroy({ response }: HttpContext) {}
}
