import { inject } from '@adonisjs/core'
import PortClubRepository from '#repositories/interfaces/club_interface'
import { Exception } from '@adonisjs/core/exceptions'

@inject()
export default class ClubService {
  constructor(protected clubRepository: PortClubRepository) {}

  async createClub(data: any) {
    try {
      const club = await this.clubRepository.create(data)
      return club
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async getAllClubs() {
    try {
      const clubs = await this.clubRepository.find()
      return clubs
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async getClubById(id: number) {
    try {
      const club = await this.clubRepository.findById(id)
      if (!club) {
        throw new Exception('Club not found')
      }
      return club
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async getMemberofClubs(club_id: number) {
    const club = await this.getClubById(club_id)

    this.clubRepository.getMemberOfCLubs(club)

    return club
  }

  async eventsOfClubs(club_id: number) {
    const club = await this.getClubById(club_id)
    await this.clubRepository.getEventOfCLubs(club)

    return club.events
  }

  async updateClubById(id: number, data: any) {
    try {
      let club = await this.clubRepository.findById(id)
      if (!club) {
        throw new Exception('Club not found')
      }
      club = await this.clubRepository.update(id, data)
      if (!club) {
        throw new Exception('Validation Error: Email is required')
      }
      return club
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async deleteClubById(id: number) {
    try {
      const club = await this.clubRepository.findById(id)
      console.log(club)
      if (!club) {
        throw new Exception('Club not found')
      }
      console.log(await this.clubRepository.delete(id))
      return await this.clubRepository.delete(id)
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async addCreatorOfClub(clubId: number, userId: number) {
    try {
      const club = await this.clubRepository.findById(clubId)
      if (club) {
        await club.related('members').attach({
          [userId]: {
            role: 'ADMIN',
          },
        })
        return club
      } else {
        throw new Exception('Club not found')
      }
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async addMemberToClub(clubId: number, userId: number) {
    const existingMember = await this.clubRepository.findMemberByUserId(clubId, userId)
    if (existingMember) {
      return existingMember
    }

    const club = await this.clubRepository.findById(clubId)
    if (!club) {
      throw new Error('Club not found')
    }

    await this.clubRepository.addMemberToClub(clubId, userId)

    const addedMember = await this.clubRepository.findMemberByUserId(clubId, userId)
    const role = addedMember?.$extras.pivot_role
    return {
      memberId: addedMember?.id,
      role,
    }
  }
  async updateMembersRole(clubId: number, memberIds: number[], newRole: string) {
    try {
      const club = await this.getClubById(clubId)
      if (!club) {
        throw new Exception('Club not found')
      }

      const updatedMembers = []

      for (const memberId of memberIds) {
        const member = await this.clubRepository.findMemberByUserId(clubId, memberId)
        if (!member) {
          throw new Exception(`Member with ID ${memberId} not found in this club`)
        }

        await this.clubRepository.updateMemberRole(clubId, memberId, newRole)
        updatedMembers.push(await this.clubRepository.findMemberByUserId(clubId, memberId))
      }

      return updatedMembers
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async isMemberOfClub(clubId: number, userId: number) {
    try {
      const club = await this.getClubById(clubId)
      if (!club) {
        throw new Error('Club not found')
      }
      const members = await this.clubRepository.findMemberByUserId(clubId, userId)
      return members
    } catch (error) {
      throw new Exception(error.message)
    }
  }

  async memberHasRoleAdmin(userId: number, clubId: number) {
    try {
      const club = await this.getClubById(clubId)
      if (club) {
        const member = await this.clubRepository.findMemberByUserId(clubId, userId)
        if (member && member.$extras.pivot_role === 'admin') {
          return true
        }
        return false
      }
    } catch (error) {
      throw new Exception(error.message)
    }
  }
  async removeMemberFromClub(clubId: number, userId: number) {
    try {
      const club = await this.getClubById(clubId)
      if (!club) {
        throw new Exception('Club not found')
      }

      const member = await this.clubRepository.findMemberByUserId(clubId, userId)
      if (!member) {
        throw new Exception('Member not found in this club')
      }

      await this.clubRepository.removeMemberFromClub(clubId, userId)

      return true
    } catch (error) {
      throw new Exception(error.message)
    }
  }
}
