import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('update club', () => {
    
    app.container.swap(PortClubRepository, () => {
        return new FakeClubRepository()
    })

    test('should update existing club', async ({ assert }) => {
        const clubId = 1;
        const updatedData = {
            id: 1, 
            name: 'Updated Club Name',
            email: 'updated@test.com',
            description: 'Updated club description',
            location: 'Updated Location',
            phone: '1234567890',
            facebook: 'updated_facebook',
            twitter: 'updated_twitter'
        };

        const clubService = new ClubService(new FakeClubRepository());
        const updatedClub = await clubService.updateClubById(clubId, updatedData);

        assert.isDefined(updatedClub);
        assert.equal(updatedClub.id, clubId);
        assert.equal(updatedClub.name, updatedData.name);
        assert.equal(updatedClub.email, updatedData.email);
        assert.equal(updatedClub.description, updatedData.description);
        assert.equal(updatedClub.location, updatedData.location);
        assert.equal(updatedClub.phone, updatedData.phone);
        assert.equal(updatedClub.facebook, updatedData.facebook);
        assert.equal(updatedClub.twitter, updatedData.twitter);
    });

    test('should throw a error if update non-existing club', async ({ expect }) => {
        const nonExistingClubId = 999;
        const updatedData = {
            name: 'Updated Club Name',
            email: 'updated@test.com',
            description: 'Updated club description',
            location: 'Updated Location',
            phone: '1234567890',
            facebook: 'updated_facebook',
            twitter: 'updated_twitter'
        };

        class FakeClubRepository extends PortClubRepository {
          async update(id: any, item: Partial<Club>): Promise<Club | null> {
            return null;
          }
          findById(id: any): Promise<Club | null> {
            return null;
          }
        }
        const clubService = new ClubService(new FakeClubRepository())
      
        await expect(() => clubService.updateClubById(nonExistingClubId, updatedData)).rejects.toThrow('Club not found');
    });

    test('should throw a error if update club with incomplete data', async ({ expect }) => {
        const clubId = 1;
        const incompleteData = {
            name: 'Updated Club Name',
            description: 'Updated club description',
            location: 'Updated Location',
            phone: '1234567890',
            facebook: 'updated_facebook',
            twitter: 'updated_twitter'
        };
        const fakeClub = {
          id: 1, 
          name: 'Updated Club Name',
          email: 'updated@test.com',
          description: 'Updated club description',
          location: 'Updated Location',
          phone: '1234567890',
          facebook: 'updated_facebook',
          twitter: 'updated_twitter'
      };

        class FakeClubRepository extends PortClubRepository {
          async update(id: any, item: Partial<Club>): Promise<Club | null> {
            return null;
          }
          findById(id: any): Promise<Club | null> {
            return fakeClub
          }
        }

        const clubService = new ClubService(new FakeClubRepository());
      
        await expect(() => clubService.updateClubById(clubId, incompleteData)).rejects.toThrow('Validation Error: Email is required');
    });
  
    app.container.restore(ClubService)
});
