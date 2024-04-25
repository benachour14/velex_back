import Club from '#models/club'
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

  async delete(id: number): Promise<Club | null> {
    const club = await Club.find(id)
    if (club) {
      club.delete()
      return club
    }
    return null
  }

  async findByName(name: string): Promise<Club | null> {
    return Club.findBy('name', name)
  }

  

  async findById(id: number): Promise<Club | null> {
    return Club.find(id)
  }

  async find(): Promise<Club[]> {
    return await Club.all()
  }
}
