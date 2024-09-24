import { inject } from '@adonisjs/core'
import Event from '#models/event'
import PortEventRepository from '#repositories/interfaces/event_interface'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class EventService {
  constructor(protected eventRepository: PortEventRepository) {}
  async createEvent(data: any) {
    console.log('data', data)

    try {
      const event = await this.eventRepository.create(data)
      console.log('event', event)

      return event
    } catch (error) {
      console.log('error', error.code)

      if (error.code === '23505') {
        throw new Exception('Event already exists')
      } else {
        throw new Exception(error.message)
      }
    }
  }

  async getAllEvents() {
    try {
      const events = await Event.all()
      return events
    } catch (error) {
      throw error
    }
  }

  async getEventById(id: number) {
    try {
      const event = await Event.find(id)
      if (!event) {
        throw new Error('Event not found')
      }
      return event
    } catch (error) {
      throw error
    }
  }

  async updateEventById(id: number, data: any) {
    try {
      const event = await this.getEventById(id)
      if (event) {
        event.merge(data)
        await event.save()
        return event
      } else {
        throw new Error('Event not found')
      }
    } catch (error) {
      throw error
    }
  }

  async deleteEventById(id: number) {
    try {
      const event = await Event.find(id)
      if (event) {
        await event.delete()
        return event
      } else {
        throw new Error('Event not found')
      }
    } catch (error) {
      throw error
    }
  }
}
