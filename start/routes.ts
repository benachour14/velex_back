/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import AuthController from 'App/Controllers/Http/AuthController'
import authRoutes from './auth_routes.js'

router
  .group(() => {
    router.get('/', async () => {
      return {
        hello: 'world',
      }
    })

    authRoutes()
  })
  .prefix('api')
