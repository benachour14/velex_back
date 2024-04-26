import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('delete club', () => {
    
    app.container.swap(PortClubRepository, () => {
      return new FakeClubRepository()
    })

    test('should delete existing club', async ({ assert }) => {
      const existingClubId = 1;
      const fakeClub = {
        id: 1, 
        name: 'Test Club 1',
        logo: "test_logo1.png",
        email: 'test1@test.com',
        description: 'This is test club 1',
        location: 'Test Location 1',
        phone: '123456789',
        facebook: 'test_facebook1',
        twitter: 'test_twitter1'
    };

      
      const clubService = new ClubService(new FakeClubRepository());
      const deletedClub = await clubService.deleteClubById(existingClubId);

      assert.deepEqual(deletedClub, fakeClub)
  });

  test('should throw an error if deleting non-existing club', async ({ expect }) => {
      const nonExistingClubId = 999;

      class FakeClubRepository extends PortClubRepository {
        delete(id: any): Promise<Club> {
            throw new Error('Club not found')
        }
        findById(id: any): Promise<Club | null> {
          return null;
        }
    }
      const clubService = new ClubService(new FakeClubRepository());

      await expect(() => clubService.deleteClubById(nonExistingClubId)).rejects.toThrow('Club not found');
  });
  
    
    app.container.restore(ClubService)
})