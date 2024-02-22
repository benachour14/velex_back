/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import authRoutes from './auth_routes.js'
import clubRoutes from './club_routes.js'
import userRoutes from './user_routes.js'
import eventRoutes from './event_routes.js'
const UsersController = () => import('#controllers/users_controller')

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })
    router.get('/users', [UsersController, 'index'])
    clubRoutes()
    userRoutes()
    authRoutes()
    eventRoutes()
  })
  .prefix('api')
