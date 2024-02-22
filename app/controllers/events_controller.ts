import EventService from '#services/event_service'
import { eventValidator } from '#validators/event_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class EventsController {
  constructor(protected eventService: EventService) {}

  async index({ response }: HttpContext) {
    try {
      const events = await this.eventService.getAllEvents()
      return response.status(200).json(events)
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  async show({ params, response }: HttpContext) {
    try {
      const event = await this.eventService.getEventById(params.id)
      return response.status(200).json(event)
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  async create({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await eventValidator.validate(data)

    try {
      const event = await this.eventService.createEvent(payload)
      return response.status(201).json(event)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const payload = await eventValidator.validate(data)

    try {
      const event = await this.eventService.updateEventById(params.id, payload)
      return response.status(200).json(event)
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await this.eventService.deleteEventById(params.id)
      return response.status(200).json({ message: 'Event deleted successfully' })
    } catch (error) {
      return response.status(404).json({ error: error.message })
    }
  }
}
