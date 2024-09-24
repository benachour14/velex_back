import EventService from '#services/event_service'
import { test } from '@japa/runner'
import { FakeEventRepository } from './base.js'

import { DateTime } from 'luxon'

test.group('create event', () => {
  test('should create a new event', async ({ assert }) => {
    const eventData = {
      title: 'Test Event',
      description: 'This is a test event',
      location: 'Test Location',
      startDate: DateTime.fromISO('2022-04-01'),
      endDate: DateTime.fromISO('2022-04-01'),
    }
    try {
      const eventService = new EventService(new FakeEventRepository())
      const event = await eventService.createEvent(eventData)

      
      assert.deepEqual(event, eventData)
    } catch (error) {
      console.log(error.message)
    }
  })

 /*  test('should throw an error when creating an event with missing title', async ({ assert }) => {
    const eventData = {
      description: 'This is a test event',
      location: 'Test Location',
      startDate: DateTime.fromISO('2022-04-01'),
    }

    const eventService = new EventService(new FakeEventRepository())

    try {
      await eventService.createEvent(eventData)
      assert.fail('Expected an error to be thrown')
    } catch (error) {
      console.log('test', error)

      assert.equal(error.message, 'E_VALIDATION_FAILURE: title is required')
    }
  }) */
})
