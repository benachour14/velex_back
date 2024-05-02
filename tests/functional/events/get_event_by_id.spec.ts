import PortEventRepository from '#repositories/interfaces/event_interface'
import EventService from '#services/event_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeEventRepository } from './base.js'

test.group('get event by id', () => {
  app.container.swap(PortEventRepository, () => {
    return new FakeEventRepository()
  })

  test('should get event by id', async ({ assert }) => {
    const fakeEvent = {
      id: 1,
      title: 'Test Event',
      description: 'This is test event',
      date: '2022-01-01',
      time: '10:00',
      location: 'Test Location',
      capacity: 50,
      price: 10,
      clubId: 1,
    }

    const eventService = new EventService(new FakeEventRepository())

    const event = await eventService.getEventById(fakeEvent.id)
    assert.deepEqual(event, fakeEvent)
  })

  test('should throw an error if event not found', async ({ assert, expect }) => {
    const eventService = new EventService(new FakeEventRepository())

    try {
      await eventService.getEventById(999)
      assert.fail('Expected an error to be thrown')
    } catch (error) {
      expect(error.message).toBe('Event not found')
    }
  })

  app.container.restore(EventService)
})
