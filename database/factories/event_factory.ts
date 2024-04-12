import factory from '@adonisjs/lucid/factories'
import Event from '#models/event'

export const EventFactory = factory
  .define(Event, async ({ faker }) => {
    return {}
  })
  .build()