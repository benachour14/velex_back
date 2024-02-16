import router from '@adonisjs/core/services/router'
const UsersController = () => import('#controllers/users_controller')
import { middleware } from '#start/kernel'

export default function authRoutes() {
  router
    .group(() => {
      router.get('/:id', [UsersController, 'show']) // register new user
      router.put('/:id', [UsersController, 'update']) // register new user
      router.delete('/:id', [UsersController, 'delete']) // register new user
    })
    .use(
      middleware.auth({
        guards: ['api'],
      })
    )
    .prefix('/users')
}
