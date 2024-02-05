import router from '@adonisjs/core/services/router'
import ClubsController from '#controllers/clubs_controller'

export default function clubRoutes() {
  router
    .group(() => {
      router.post('/index', [ClubsController, 'index']) // register new user

      router.post('/create', [ClubsController, 'create']) // login user
    })
    .prefix('/club')
}
