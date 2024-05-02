import PortEventRepository from '#repositories/interfaces/event_interface'
import EventService from '#services/event_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeEventRepository } from './base.js'

test.group('all events', () => {
  app.container.swap(PortEventRepository, () => {
    return new FakeEventRepository()
  })

  test('should get all events', async ({ assert }) => {
    const fakeEvents = [
      {
        id: 1,
        title: 'Test Event 1',
        description: 'This is test event 1',
        date: '2022-01-01',
        time: '10:00',
        location: 'Test Location 1',
        capacity: 50,
        price: 10,
        clubId: 1,
      },
      {
        id: 2,
        title: 'Test Event 2',
        description: 'This is test event 2',
        date: '2022-02-02',
        time: '12:00',
        location: 'Test Location 2',
        capacity: 100,
        price: 20,
        clubId: 2,
      },
    ]
    const eventService = new EventService(new FakeEventRepository())

    const events = await eventService.getAllEvents()
    const formattedEvents = Object.values(events)
    assert.deepEqual(formattedEvents, fakeEvents)
  })

  test('should return an empty array if there are no events', async ({ assert }) => {
    const emptyEventRepository = {
      find: async () => [],
    }

    const eventService = new EventService(emptyEventRepository)

    const events = await eventService.getAllEvents()

    assert.isArray(events)
    assert.isEmpty(events)
  })

  app.container.restore(EventService)
})
