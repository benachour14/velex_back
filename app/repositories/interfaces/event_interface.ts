import Event from '#models/event'
import BaseRepository from './base_interface.js'

export default abstract class PortEventRepository implements BaseRepository<Event> {
  abstract find(): Promise<Event[]>
  abstract create(id: any, item: Partial<Event>): Promise<Event>
  abstract update(id: any, item: Partial<Event>): Promise<Event>
  abstract delete(id: any): Promise<Event>
  abstract findById(id: any): Promise<Event | null>
  abstract findByName(name: string): Promise<Event | null>
  abstract findEventsWithMembers(): Promise<Event[]>
}
