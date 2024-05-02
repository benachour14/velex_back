import PortEventRepository from '#repositories/interfaces/event_interface'
import EventService from '#services/event_service'
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeEventRepository } from './base.js'

test.group('update event', () => {
  app.container.swap(PortEventRepository, () => {
    return new FakeEventRepository()
  })

  test('should update event', async ({ assert }) => {
    const updatedEventData = {
      title: 'Updated Test Event',
      description: 'This is updated test event',
      date: '2022-01-02',
      time: '11:00',
      location: 'Updated Test Location',
      capacity: 60,
      price: 15,
      clubId: 1,
    }

    const eventService = new EventService(new FakeEventRepository())

    const event = await eventService.updateEventById(1, updatedEventData)
    assert.deepEqual(event, { id: 1, ...updatedEventData })
  })

  test('should throw an error if event not found', async ({ assert, expect }) => {
    const updatedEventData = {
      title: 'Updated Test Event',
      description: 'This is updated test event',
      date: '2022-01-02',
      time: '11:00',
      location: 'Updated Test Location',
      capacity: 60,
      price: 15,
      clubId: 1,
    }

    const eventService = new EventService(new FakeEventRepository())

    try {
      await eventService.updateEventById(999, updatedEventData)
      assert.fail('Expected an error to be thrown')
    } catch (error) {
      expect(error.message).toBe('Event not found')
    }
  })

  app.container.restore(EventService)
})
