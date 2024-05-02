import Club from '#models/club'
import PortClubRepository from '#repositories/interfaces/club_interface'
import ClubService from '#services/club_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('create club', () => {
  app.container.swap(PortClubRepository, () => {
    return new FakeClubRepository()
  })

  test('should create club', async ({ assert }) => {
    const fakeClub = {
      name: 'Test Club3',
      logo: 'test_logo.png',
      description: 'This is a test club',
      phone: '123456789',
      email: 'test@test.com',
      location: 'Test Location',
      facebook: 'test_facebook',
      twitter: 'test_twitter',
    }

    const clubService = new ClubService(new FakeClubRepository())
    const club = await clubService.createClub(fakeClub)
    assert.deepEqual(club, fakeClub)
  })
  test('should throw a error if create club already exists', async ({ expect }) => {
    const existingClub = {
      name: 'Test Club',
      logo: 'test_logo.png',
      description: 'This is an existing club',
      phone: '987654321',
      email: 'existing@test.com',
      location: 'Existing Location',
      facebook: 'existing_facebook',
      twitter: 'existing_twitter',
    }

    class FakeClubRepository extends PortClubRepository {
      create(data: any): Promise<Club> {
        throw new Error('Club already exists')
      }
    }
    const clubService = new ClubService(new FakeClubRepository())

    await expect(() => clubService.createClub(existingClub)).rejects.toThrow('Club already exists')
  })
  test('should throw a error if create club without a email', async ({ expect }) => {
    const fakeClub = {
      name: 'Test Club',
      logo: 'test_logo.png',
      description: 'This is an existing club',
      phone: '987654321',
      email: '',
      location: 'Existing Location',
      facebook: 'existing_facebook',
      twitter: 'existing_twitter',
    }
    class FakeClubRepository extends PortClubRepository {
      create(data: any): Promise<Club> {
        throw new Error('Email is required')
      }
    }
    const clubService = new ClubService(new FakeClubRepository())

    await expect(() => clubService.createClub(fakeClub)).rejects.toThrow('Email is required')
  })

  app.container.restore(ClubService)
})
