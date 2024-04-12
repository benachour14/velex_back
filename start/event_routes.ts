import router from '@adonisjs/core/services/router'
const EventsController = () => import('#controllers/events_controller')

export default function eventRoutes() {
  router
    .group(() => {
      router.get('/', [EventsController, 'index']) // Get a list of all events
      router.get('/:id', [EventsController, 'show']) // Get a single event by id
      router.post('/', [EventsController, 'create']) // Create a new event
      router.patch('/:id', [EventsController, 'update']) // Update an event by id
      router.delete('/:id', [EventsController, 'destroy']) // Delete an event by id
    })
    .prefix('/events') // Assuming you want to prefix your API routes with "/api"
}
