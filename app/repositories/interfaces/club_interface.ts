import Club from '#models/club'
import BaseRepository from './base_interface.js'

export default abstract class PortClubRepository implements BaseRepository<Club> {
  abstract find(): Promise<Club[]>
  abstract create(id: any, item: Partial<Club>): Promise<Club>
  abstract update(id: any, item: Partial<Club>): Promise<Club>
  abstract delete(id: any): Promise<Club>
  abstract findById(id: any): Promise<Club | null>
  abstract findByName(name: string): Promise<Club | null>
  abstract findClubsWithMembers(): Promise<Club[]>
}
