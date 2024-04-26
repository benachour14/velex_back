import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('all club', () => {
    
    app.container.swap(PortClubRepository, () => {
      return new FakeClubRepository()
    })

   
  test('should get all clubs', async ({ assert }) => {
    const fakeClubs = [
      {
          id: 1,
          name: 'Test Club 1',
          logo: 'test_logo1.png',
          description: 'This is test club 1',
          phone: '123456789',
          email: 'test1@test.com',
          location: 'Test Location 1',
          facebook: 'test_facebook1',
          twitter: 'test_twitter1'
      },
      {
          id: 2,
          name: 'Test Club 2',
          logo: 'test_logo2.png',
          description: 'This is test club 2',
          phone: '987654321',
          email: 'test2@test.com',
          location: 'Test Location 2',
          facebook: 'test_facebook2',
          twitter: 'test_twitter2'
      }
  ];
      const clubService = new ClubService(new FakeClubRepository());

      const clubs = await clubService.getAllClubs();
      const formattedClubs = Object.values(clubs);
      assert.deepEqual(formattedClubs, fakeClubs);
  });
  test('should clubs is empty', async ({ assert }) => {
    const emptyClubRepository = {
      find: async () => []
    };

    const clubService = new ClubService(emptyClubRepository);

    const clubs = await clubService.getAllClubs();

    assert.isArray(clubs);
    assert.isEmpty(clubs);
  });
  
    app.container.restore(ClubService)
})