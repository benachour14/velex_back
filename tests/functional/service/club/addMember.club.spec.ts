import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('add Member club', () => {
    
    app.container.swap(PortClubRepository, () => {
      return new FakeClubRepository()
    })

    test('should add member to club', async ({ assert }) => {
      const clubId = 1;
      const userId = 1;

      const clubService = new ClubService(new FakeClubRepository());
      const club = await clubService.addMemberToClub(clubId, userId);

      assert.isTrue(club.$isPersisted);
    });

    test('should throw an error if member does not exist', async ({ expect }) => {
      const clubId = 1;
      const userId = 999; 

      const clubService = new ClubService(new FakeClubRepository());

      await expect(() => clubService.addMemberToClub(clubId, userId)).rejects.toThrow('User not found');
    });

    test('should throw an error if club does not exist', async ({ expect }) => {
      const clubId = 999; 
      const userId = 1;

      const clubService = new ClubService(new FakeClubRepository());

      await expect(() => clubService.addMemberToClub(clubId, userId)).rejects.toThrow('Club not found');
    });

    test('should throw an error if member is already a member of the club', async ({ expect }) => {
      const clubId = 1;
      const userId = 1; 

      const clubService = new ClubService(new FakeClubRepository());

      await expect(() => clubService.addMemberToClub(clubId, userId)).rejects.toThrow('User is already a member of the club');
    });
    
    app.container.restore(ClubService)
})