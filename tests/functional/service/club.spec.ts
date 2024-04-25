import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'

test.group('club', () => {
    const fakeClub = [
        {
            name: 'Test Club',
            logo: 'test_logo.png',
            description: 'This is a test club',
            phone: '123456789',
            email: 'test@test.com',
            location: 'Test Location',
            facebook: 'test_facebook',
            twitter: 'test_twitter'
        },
        {
            name: 'Test Club 2',
            logo: 'test_logo2.png',
            description: 'This is a test club2',
            phone: '1234567892',
            email: 'test2@test.com',
            location: 'Test Location 2',
            facebook: 'test_facebook2',
            twitter: 'test_twitter2'
        }
    ]
  
    class FakeClubRepository implements PortClubRepository {
        find(): Promise<Club[]> {
            throw new Error('Method not implemented.')
        }
        async create(item: Partial<Club>): Promise<Club> {
            throw new Error('Method not implemented.')
        }
        update(id: any, item: Partial<Club>): Promise<Club> {
          throw new Error('Method not implemented.')
        }
        delete(id: any): Promise<Club> {
          throw new Error('Method not implemented.')
        }
        findById(id: any): Promise<Club | null> {
          throw new Error('Method not implemented.')
        }
        findByName(name: string): Promise<Club | null> {
          throw new Error('Method not implemented.')
        }
      }
      app.container.swap(PortClubRepository, () => {
        return new FakeClubRepository()
      })
    
  
    test('create club', async ({ assert }) => {
      const fakeClub = {
        name: 'Test Club3',
        logo: 'test_logo.png',
        description: 'This is a test club',
        phone: '123456789',
        email: 'test@test.com',
        location: 'Test Location',
        facebook: 'test_facebook',
        twitter: 'test_twitter'
      }
      
      const clubService = new ClubService(new FakeClubRepository())
      const club = await clubService.createClub(fakeClub)
      console.log(club)
      console.log(fakeClub)
      assert.deepEqual(club, fakeClub)
    })
    test('create club - club already exists', async ({ assert }) => {
        const existingClub = {
          name: 'Test Club',
          logo: 'test_logo.png',
          description: 'This is an existing club',
          phone: '987654321', 
          email: 'existing@test.com',
          location: 'Existing Location',
          facebook: 'existing_facebook',
          twitter: 'existing_twitter'
        }
      
        const clubService = new ClubService(new FakeClubRepository())
      
        try {
          await clubService.createClub(existingClub)
          assert.fail('Club already exists')
        } catch (error) {
          assert.equal(error.message, 'Club already exists')
        }
      })
      
  })
  