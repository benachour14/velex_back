import { inject } from '@adonisjs/core'
import Club from "#models/club";

@inject()
export default class ClubService {

    constructor() { }

    async createClub(data: any) {
        try {
            const club = await Club.create(data)
            return club
        } catch (error) {
            if (error.code === '23505') {
                return { error: 'Club already exists' }
            } else return { error: error }
        }
    }


    async getAllClubs() {
        return await Club.all();
    }


    async getClubById(id: number) {
        return await Club.find(id);
    }

    async updateClubById(id: number, data: any) {
        const club = await Club.find(id);
        club?.merge(data);
        return await club?.save();
    }


    async addMenberToClub(clubId: number, userId: number) {
        /*  const club = await Club.find(clubId);
         club?.related('members').attach([userId]);
         return club; */
    }
}