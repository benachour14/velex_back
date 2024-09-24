import Event from '#models/event'
import PortEventRepository from '#repositories/interfaces/event_interface'

export const fakeEvent = [
  {
    id: 1,
    title: 'Event A',
    description: 'Description of Event A',
    location: 'Location of Event A',
    startDate: new Date('2022-01-01T00:00:00'),
    endDate: new Date('2022-01-02T00:00:00'),
    clubId: 1,
    participants: [1, 2],
  },
  {
    id: 2,
    title: 'Event B',
    description: 'Description of Event B',
    location: 'Location of Event B',
    startDate: new Date('2022-02-01T00:00:00'),
    endDate: new Date('2022-02-02T00:00:00'),
    clubId: 2,
    participants: [2, 3],
  },
]

export class FakeEventRepository extends PortEventRepository {
  async find(): Promise<Event[]> {
    return fakeEvent
  }

  async create(item: Partial<Event>): Promise<Event> {
    return (await item) as Event
  }

  async update(id: any, item: Partial<Event>): Promise<Event> {
    return item as Event
  }

  async delete(id: any): Promise<Event> {
    throw new Error('Method not implemented.')
  }

  async findById(id: any): Promise<Event | null> {
    return fakeEvent[id]
  }

  async findByTitle(title: string): Promise<Event | null> {
    throw new Error('Method not implemented.')
  }

  findEventsWithMembers(): Promise<Event[]> {
    throw new Error('Method not implemented.')
  }

  async verifyEvent(title: string, clubId: number): Promise<Event | null> {
    return { ...fakeEvent[0] }
  }

  async createEventToken(event: Event): Promise<any> {
    return 'oat_OQ.QVQxVk9JUERFeGhVdjVLUlg2VUhEMi1uTGo5U3FTVHRTRXJSUXZILTE1OTg0MjExODM'
  }
}
