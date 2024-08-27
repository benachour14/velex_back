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
    /*const clubService = new ClubService(new FakeClubRepository());

    test('should add member to club', async ({ assert }) => {
      // Arrange
      const clubId = 1;
      const userId = 1;

      // Act
      const addedMember = await clubService.addMemberToClub(clubId, userId);
      console.log(addedMember)
      // Assert
      assert.isDefined(addedMember);
      assert.equal(addedMember.userId, userId);
      assert.equal(addedMember.clubId, clubId);
    });

  test('should throw an error if club does not exist', async ({ expect }) => {
      // Arrange
      const clubId = 999;
      const userId = 1;

      // Act/Assert
      await expect(() => clubService.addMemberToClub(clubId, userId)).rejects.toThrow('Club not found');
  });

  test('should return existing member if already exists', async ({ assert }) => {
      // Arrange
      const clubId = 1;
      const userId = 1;

      // Act
      const existingMember = await clubService.addMemberToClub(clubId, userId);

      // Assert
      assert.isDefined(existingMember);
      assert.equal(existingMember.userId, userId);
      assert.equal(existingMember.clubId, clubId);
  });

  test('should throw an error if user is already a member of the club', async ({ expect }) => {
      // Arrange
      const clubId = 1;
      const userId = 1;

      // Act/Assert
      await expect(() => clubService.addMemberToClub(clubId, userId)).rejects.toThrow('User is already a member of the club');
  });*/
    
    app.container.restore(ClubService)
})