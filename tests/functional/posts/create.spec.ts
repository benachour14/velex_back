/*import { test } from '@japa/runner'
import ClubService from '#services/club_service'

const fakeClub = {
  name: 'fakeClub01',
  logo: 'https://example.com/logos/sunset-soccer-club.png',
  description: 'An amateur soccer club for enthusiasts and upcoming players.',
  phone: '+33-1234567888',
  email: 'fakeClub01@sunsetsc.com',
  facebook: 'https://www.facebook.com/sunsetsc',
  twitter: 'https://twitter.com/sunsetsc',
  createdAt: '2024-02-09T11:21:57.946+00:00',
  updatedAt: '2024-02-09T11:21:57.946+00:00',
  id: 2,
}

test.group('club', () => {
  test('create club', async ({ assert }) => {
    const clubService = new ClubService()
    const club = await clubService.createClub(fakeClub)
    assert.deepEqual(club, fakeClub)
  })

  test('get all clubs', async ({ assert }) => {
    const clubService = new ClubService()
    await clubService.createClub(fakeClub) // Make sure there is at least one club
    const clubs = await clubService.getAllClubs()
    assert.isArray(clubs)
    assert.isTrue(clubs.some((c) => c.id === fakeClub.id))
  })

  test('get club by id', async ({ assert }) => {
    const clubService = new ClubService()
    await clubService.createClub(fakeClub) // Ensure the club is created
    const club = await clubService.getClubById(fakeClub.id)
    assert.deepEqual(club, fakeClub)
  })

  test('update club by id', async ({ assert }) => {
    const updatedData = { name: 'updatedFakeClub' }
    const clubService = new ClubService()
    await clubService.createClub(fakeClub) // Ensure the club is created
    const updatedClub = await clubService.updateClubById(fakeClub.id, updatedData)
    assert.equal(updatedClub.name, updatedData.name)
  })

  test('delete club by id', async ({ assert }) => {
    const clubService = new ClubService()
    await clubService.createClub(fakeClub) // Ensure the club is created
    await clubService.deleteClubById(fakeClub.id)
    const club = await clubService.getClubById(fakeClub.id)
    assert.isNull(club)
  })
})
*/