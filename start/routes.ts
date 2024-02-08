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
import UsersController from '#controllers/users_controller'

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })
    router.get('/users', [UsersController, 'index'])
    clubRoutes()
    authRoutes()
  })
  .prefix('api')
