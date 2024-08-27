import Club from '#models/club'
import User from '#models/user'
import PortClubRepository from '#repositories/interfaces/club_interface'

export default class ClubRepository implements PortClubRepository {
  async create(data: any): Promise<Club> {
    return Club.create(data)
  }

  async update(id: number, data: any): Promise<Club | null> {
    const club = await Club.find(id)
    if (club) {
      club.merge(data)
      return club.save()
    }
    return null
  }

  async delete(id: number): Promise<void | null> {
    const club = await Club.find(id)
    if (club) {
       await club.delete()
       return null
    }
    return null
  }

  async findById(id: number): Promise<Club | null> {
    const club = await Club.find(id)
    if (club) {
      await club.load('members');
      return club
    }
    return null
  }

  async find(): Promise<Club[]> {
    return await Club.all()
  }

  async findMemberByUserId(clubId: number, userId: number): Promise<User | null> {
    const club = await Club.find(clubId);
    if (!club) {
      return null; 
    }

    const member = await club.related('members').query().where('user_id', userId).first();
    if (!member) {
      return null; 
    }

    return member;
  }

  async addMemberToClub(clubId: number, userId: number): Promise<void> {
    const club = await Club.findOrFail(clubId);
    await club.related('members').attach([userId]);
  }

}
