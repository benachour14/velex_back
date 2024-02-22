import { inject } from '@adonisjs/core'
import Event from '#models/club'

@inject()
export default class EventService {
  constructor() { }

  async createEvent(data: any) {
    try {
      const event = await Event.create(data)
      return event
    } catch (error) {
      throw error
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
