import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await User.createMany([
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'USER',
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password456',
        role: 'ADMIN',
      },
      {
        fullName: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password789',
        role: 'USER',
      },
    ])
  }
}
