import Club from '#models/club'
import PortClubRepository from '#repositories/interfaces/club_interface'

export const fakeClubs = [
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
]

export class FakeClubRepository implements PortClubRepository {
    find(): Promise<Club[]> {
        return {...fakeClubs};
    }
    async create(item: Partial<Club>): Promise<Club> {
        return (await item) as Club
    }
    async update(id: any, item: Partial<Club>): Promise<Club | null> {
      return (await item) as Club
    }
    delete(id: any): Promise<void | null> {
      
    }
    findById(id: any): Promise<Club | null> {
      return fakeClubs[0]
    }
}
