import Club from '#models/club'
import BaseRepository from './base_interface.js'

export default abstract class PortClubRepository implements BaseRepository<Club> {
  abstract find(): Promise<Club[]>
  abstract create(item: Partial<Club>): Promise<Club>
  abstract update(id: any, item: Partial<Club>): Promise<Club | null>
  abstract delete(id: any): Promise<Club | null>
  abstract findById(id: any): Promise<Club | null>
  abstract findByName(name: string): Promise<Club | null>
}
