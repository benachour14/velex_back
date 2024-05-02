import { test } from '@japa/runner'
import Event from '#models/event'
import EventService from '#services/event_service'
import { FakeEventRepository } from './base.js'

test.group('delete event', () => {
  test('should delete an existing event', async ({ assert }) => {
    const existingEvent = new Event()
    existingEvent.id = 1
    existingEvent.title = 'Test Event'
    existingEvent.description = 'This is a test event'
    existingEvent.location = 'Test Location'

    const fakeEventRepository = new FakeEventRepository()

    fakeEventRepository.events.push(existingEvent)

    const eventService = new EventService(fakeEventRepository)
    await eventService.deleteEventById(existingEvent.id)

    const deletedEvent = fakeEventRepository.events.find((event) => event.id === existingEvent.id)
    assert.isNull(deletedEvent)
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
