import EventPolicy from '#policies/event_policy'
import EventService from '#services/event_service'
import { eventValidator } from '#validators/event_validator'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

@inject()
export default class EventsController {
  constructor(private eventService: EventService) {}
  async({}: HttpContext) {}

  async index({ response }: HttpContext) {
    const events = await this.eventService.getAllEvents()
    return response.json(events)
  }

  async show({ params, response }: HttpContext) {
    const event = await this.eventService.getEventById(params.id)
    if (!event) {
      return response.notFound('Event not found')
    }

    return response.json(event)
  }

  async create({ request }: HttpContext) {
    const data = await eventValidator.validate(request.all())
    // Transform dates to Luxon DateTime
    if (data) {
      if (data.startDate) {
        data.startDate = DateTime.fromJSDate(data.startDate)
      }
      if (data.endDate) {
        data.endDate = DateTime.fromJSDate(data.endDate)
      } // You can perform additional date validations here if needed
      if (data.endDate && data.startDate > data.endDate) {
        return response.status(422).json({ error: 'End date must be after start date' })
      }
    }

    try {
      const event = await this.eventService.createEvent(data)
      return event
    } catch (error) {
      console.log('error', error)

      return { error: error }
    }
  }

  async update({ bouncer, params, response }: HttpContext) {
    const data = await eventValidator.validate(eventValidator)

    const event = await this.eventService.getEventById(params.id)
    if (!event) {
      return response.notFound('Event not found')
    }

    if (await bouncer.with(EventPolicy).denies('update', event)) {
      return response.forbidden('Cannot update this event')
    }

    const updatedEvent = await this.eventService.updateEventById(event.id, data)
    return response.json(updatedEvent)
  }

  async destroy({ bouncer, params, response }: HttpContext) {
    const event = await this.eventService.getEventById(params.id)
    if (!event) {
      return response.notFound('Event not found')
    }

    if (await bouncer.with(EventPolicy).denies('delete', event)) {
      return response.forbidden('Cannot delete this event')
    }

    await this.eventService.deleteEventById(event.id)
    return response.noContent()
  }
}
