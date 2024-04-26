import { inject } from '@adonisjs/core'
import PortClubRepository from '#repositories/interfaces/club_interface'

@inject()
export default class ClubService {
  constructor(protected clubRepository: PortClubRepository) {}

  async createClub(data: any) {
    try {
      const club = await this.clubRepository.create(data)
      return club
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Club already exists222')
      } else {
        throw error
      }
    }
  }

  async getAllClubs() {
    try {
      const clubs = await this.clubRepository.find()
      return clubs
    } catch (error) {
      throw error
    }
  }

  async getClubById(id: number) {
    try {
      const club = await this.clubRepository.findById(id)
      if (!club) {
        throw new Error('Club not found')
      }
      return club
    } catch (error) {
      throw error
    }
  }

  async updateClubById(id: number, data: any) {
    try {
      let club = await this.clubRepository.findById(id)
      if (club) {
        club = await this.clubRepository.update(id, data)
        return club
      } else {
        throw new Error('Club not found')
      }
    } catch (error) {
      throw error
    }
  }

  async deleteClubById(id: number) {
    try {
      const club = await this.clubRepository.findById(id)
      if (club) {
        await club.delete()
      } else {
        throw new Error('Club not found')
      }
    } catch (error) {
      throw error
    }
  }

  async addMemberToClub(clubId: number, userId: number) {
        try {
      const club = await this.clubRepository.findById(clubId)
      if (club) {
        await club.related('members').attach([userId])
        return club
      } else {
        throw new Error('Club not found')
      }
    } catch (error) {
      throw error
    } 
  }

  async isMemberOfClub(clubId: number, userId: number) {
    try {
      const club = await this.getClubById(clubId)
      if (club) {
        const members = await club.related('members').query().where('id', userId).first()
        return members ? true : false
      }
    } catch (error) {
      throw error
    }
  }

  async memberHasRoleAdmin(userId: number, clubId: number) {
    try {
      const club = await this.getClubById(clubId)
      if (club) {
        const member = await club.related('members').query().where('id', userId).first()
        if (member && member.$extras.pivot_role === 'admin') {
          return true
        }
        return false
      }
    } catch (error) {
      throw error
    }
  }
}
