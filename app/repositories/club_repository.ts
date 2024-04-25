import Club from '#models/club'
import PortClubRepository from '#repositories/interfaces/club_interface'

export default class ClubRepository implements PortClubRepository {
  async create(data: any): Promise<Club> {
    return Club.create(data)
  }

  async update(id: number, data: any): Promise<Club | null> {
    const club = Club.find(id)
    if (club) {
      club.merge(data)
      return club.save()
    }
    return null
  }

  async delete(id: number): Promise<void> {
    const club = Club.find(id)
    if (club) {
      return club.delete()
    }
  }

  async findByName(name: string): Promise<Club | null> {
    return Club.findOneBy('name', name)
  }

  async findClubsWithMembers(): Promise<Club[]> {
    return Club.query().with('members').fetch()
  }

  async findById(id: number): Promise<Club | null> {
    return Club.find(id)
  }

  async find(): Promise<Club[]> {
    return await Club.all()
  }
}
