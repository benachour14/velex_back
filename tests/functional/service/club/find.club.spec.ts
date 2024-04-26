import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('find club by id', () => {
    
    app.container.swap(PortClubRepository, () => {
      return new FakeClubRepository()
    })

    const clubService = new ClubService(new FakeClubRepository());

    test('should get club by valid id', async ({ assert }) => {
      
        const validClubId = 1
        const club = await clubService.getClubById(validClubId);
        assert.isDefined(club);
        assert.equal(club.id, validClubId);
    });

    test('should throw a error if get club by invalid id', async ({ expect }) => {
        const invalidClubId = 999; 

        class FakeClubRepository extends PortClubRepository {
          findById(id: any): Promise<Club | null> {
              throw new Error('Club not found')
          }
        }
        const clubService = new ClubService(new FakeClubRepository())
      
        await expect(() => clubService.getClubById(invalidClubId)).rejects.toThrow('Club not found')
    });
  
    
    app.container.restore(ClubService)
})