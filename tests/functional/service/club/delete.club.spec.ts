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

      const clubService = new ClubService(new FakeClubRepository());
      const deletedClub = await clubService.deleteClubById(existingClubId);

      assert.isNull(deletedClub)
  });

  test('should throw an error if deleting non-existing club', async ({ expect }) => {
      const nonExistingClubId = 999;

      class FakeClubRepository extends PortClubRepository {
        delete(id: any): Promise<void | null> {
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