import { inject } from '@adonisjs/core'
import Club from '#models/club'

@inject()
export default class ClubService {
  constructor() {}

  async createClub(data: any) {
    try {
      const club = await Club.create(data)
      return club
    } catch (error) {
      if (error.code === '23505') {
        throw new Error('Club already exists')
      } else {
        throw error
      }
    }
  }

  async getAllClubs() {
    try {
      const clubs = await Club.all()
      return clubs
    } catch (error) {
      throw error
    }
  }

  async getClubById(id: number) {
    try {
      const club = await Club.findOrFail(id)
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
      const club = await Club.find(id)
      if (club) {
        club.merge(data)
        await club.save()
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
      const club = await Club.find(id)
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
    /*    try {
      const club = await Club.find(clubId)
      if (club) {
        await club.related('members').attach([userId])
        return club
      } else {
        throw new Error('Club not found')
      }
    } catch (error) {
      throw error
    } */
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
