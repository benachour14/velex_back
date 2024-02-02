import router from '@adonisjs/core/services/router'
import AuthController from '#controllers/auth_controller'

export default function authRoutes() {
  router
    .group(() => {
      router.post('/register', [AuthController, 'register']) // register new user

      router.post('/login', [AuthController, 'login']) // login user
    })
    .prefix('/auth')
}
