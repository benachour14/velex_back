import { test } from '@japa/runner'
import Event from '#models/event'
import EventService from '#services/event_service'
import { FakeEventRepository } from './base.js'
import PortEventRepository from '#repositories/interfaces/event_interface'
import app from '@adonisjs/core/services/app'
import { DateTime } from 'luxon'

test.group('delete event', () => {
  app.container.swap(PortEventRepository, () => {
    return new FakeEventRepository()
  })

  test('should delete an existing event', async ({ assert }) => {
    const eventData = {
      id: 1,
      title: 'Test Event',
      description: 'This is a test event',
      location: 'Test Location',
      startDate: DateTime.fromISO('2022-04-01'),
      endDate: DateTime.fromISO('2022-04-01'),
    }
    const eventService = new EventService(new FakeEventRepository())
    await eventService.createEvent(eventData)
    const deletedEvent = await eventService.deleteEventById(1)
    assert.deepEqual(deletedEvent, eventData)
  })

  test('should throw an error when deleting a non-existing event', async ({ assert }) => {
    const eventService = new EventService(new FakeEventRepository())

    try {
      await eventService.deleteEventById(1)
      assert.fail('Expected an error to be thrown')
    } catch (error) {
      assert.equal(error.message, 'Event not found')
    }
  })

  // Ajoutez d'autres tests pour la suppression d'un événement ici
})
