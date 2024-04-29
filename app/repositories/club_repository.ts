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
      return club
    }
    return null
  }

  async find(): Promise<Club[]> {
    return await Club.all()
  }
}
