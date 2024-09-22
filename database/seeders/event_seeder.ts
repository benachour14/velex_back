import Club from '#models/club'
import User from '#models/user'
import Event from '#models/event'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const clubs = await Club.all()

    const events = await Event.createMany([
      {
        title: 'Annual Sports Tournament',
        description: 'Join us for our annual sports tournament',
        location: {
          street: 'City Stadium',
          address: '789 Stadium Rd',
          city: 'Sportsville',
          state: 'SP',
          country: 'Sportland',
          postalCode: '12345',
          latitude: 40.7128,
          longitude: -74.006,
        },
        startDate: DateTime.fromISO('2023-07-15T10:00:00'),
        endDate: DateTime.fromISO('2023-07-15T18:00:00'),
      },
      {
        title: 'Book Reading Session',
        description: 'Monthly book reading and discussion',
        location: {
          venueName: 'Central Library',
          address: '101 Book St',
          city: 'Booktown',
          state: 'BK',
          country: 'Readland',
          postalCode: '67890',
          latitude: 51.5074,
          longitude: -0.1278,
        },
        startDate: DateTime.fromISO('2023-07-20T14:00:00'),
        endDate: DateTime.fromISO('2023-07-20T16:00:00'),
      },
    ])

    // Associate events with clubs
    await events[0].related('club').associate(clubs[0])
    await events[1].related('club').associate(clubs[1])

    const users = await User.all()

    // Add participants to events
    for (const event of events) {
      await event.related('participants').attach([users[0].id, users[1].id, users[2].id])
    }
  }
}
