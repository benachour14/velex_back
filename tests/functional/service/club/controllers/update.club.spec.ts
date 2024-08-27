//import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubsController from "#controllers/clubs_controller";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubService } from '../base.js'
import { http } from "#config/app";
import { HttpContext } from "@adonisjs/core/http";

test.group('update club', () => {
    app.container.swap(ClubService, () => {
      return new FakeClubService()
    })
  
    test('should update an existing club', async ({ assert }) => {
      const clubId = 1 ;
      const updatedClubData = {
          name: 'Updated Club Name',
          description: 'Updated club description',
          location: 'Updated Location',
          email: 'updated@test.com',
          phone: '1234567890',
          facebook: 'updated_facebook',
          twitter: 'updated_twitter'
      } 
      const update = {
        params : clubId, request : updatedClubData
      } as HttpContext
  
      const clubsController = new ClubsController(new FakeClubService());
  
      const updatedClub = await clubsController.update(update);
  
      assert.deepEqual(updatedClub, updatedClubData);
    });
  
    test('should throw an error when updating a non-existing club', async ({ expect }) => {
      const nonExistingClubId = 999;
      const updatedClubData = {
        name: 'Updated Club Name',
        description: 'Updated club description',
        location: 'Updated Location',
        email: 'updated@test.com',
        phone: '1234567890',
        facebook: 'updated_facebook',
        twitter: 'updated_twitter'
      };
  
      const clubService = new ClubService(new FakeClubService());
  
      await expect(() => clubService.updateClubById(nonExistingClubId, updatedClubData)).rejects.toThrow('Club not found');
    });
  
    app.container.restore(ClubService);
  });
  