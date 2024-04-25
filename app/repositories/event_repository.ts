import Event from '#models/event'
import PortEventRepository from '#repositories/interfaces/event_interface'

export default class EventRepository implements PortEventRepository {
  create(data: any): Promise<Event> {
    return Event.create(data)
  }

  update(id: number, data: any): Promise<Event | null> {
    const event = Event.find(id)
    if (event) {
      event.merge(data)
      return event.save()
    }
    return null
  }

  delete(id: number): Promise<void> {
    const event = Event.find(id)
    if (event) {
      return event.delete()
    }
  }

  async findByName(name: string): Promise<Event | null> {
    return Event.findOneBy('name', name)
  }

  async findEventsWithMembers(): Promise<Event[]> {
    return Event.query().with('members').fetch()
  }

  async findById(id: number): Promise<Event | null> {
    return Event.find(id)
  }

  async find(): Promise<Event[]> {
    return await Event.all()
  }
}
