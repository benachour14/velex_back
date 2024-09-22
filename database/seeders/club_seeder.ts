import Club from '#models/club'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const clubs = await Club.createMany([
      {
        name: 'Sports Velo Club',
        logo: 'sports_club_logo.png',
        description: 'A club for sports enthusiasts',
        phone: '123-456-7890',
        email: 'sports@example.com',
        location: {
          address: '123 Sports St',
          city: 'Sportsville',
          state: 'SP',
          country: 'Sportland',
          postalCode: '12345',
          latitude: 40.7128,
          longitude: -74.006,
        },
        website: 'sports_club_website.com',
        facebook: 'facebook.com/sportsclub',
        twitter: 'twitter.com/sportsclub',
      },
      {
        name: 'Bycicle Club',
        logo: 'Bycicle_club_logo.png',
        description: 'A club for Bycicle lovers',
        phone: '098-765-4321',
        email: 'bycicle@example.com',
        website: 'bycicleclub.com',
        location: {
          address: '456 Library Ave',
          city: 'Booktown',
          state: 'BK',
          country: 'Readland',
          postalCode: '67890',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        facebook: 'facebook.com/bookclub',
        twitter: 'twitter.com/bookclub',
      },
    ])

    const users = await User.all()

    for (const club of clubs) {
      await club.related('members').attach({
        [users[0].id]: { role: 'ADMIN' },
        [users[1].id]: { role: 'MEMBER' },
        [users[2].id]: { role: 'MEMBER' },
      })
    }
  }
}
