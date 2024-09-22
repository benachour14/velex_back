import Club from '#models/club'
import User from '#models/user'
import BaseRepository from './base_interface.js'

export default abstract class PortClubRepository implements BaseRepository<Club> {
  abstract find(): Promise<Club[]>
  abstract create(item: Partial<Club>): Promise<Club>
  abstract update(id: any, item: Partial<Club>): Promise<Club | null>
  abstract delete(id: any): Promise<void | null>
  abstract findById(id: any): Promise<Club | null>
  abstract findMemberByUserId(clubId: number, userId: number): Promise<User | null>
  abstract addMemberToClub(clubId: number, userId: number): Promise<void>
  abstract removeMemberFromClub(clubId: number, userId: number): Promise<void>
  abstract findUsersByClubsIds(clubsIds: number[]): Promise<[any[], any]>
  abstract getMemberOfCLubs(club: Club): Promise<any>
  abstract getEventOfCLubs(club: Club): Promise<any>
}
