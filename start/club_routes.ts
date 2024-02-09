import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ClubsController = () => import('#controllers/clubs_controller')

export default function clubRoutes() {
  router
    .group(() => {
      router.get('/', [ClubsController, 'index']) // Afficher tous les clubs
      router.get('/:id', [ClubsController, 'show']) // Afficher un club individuel
    }).prefix('/clubs')

  router
    .group(() => {
      router.post('/', [ClubsController, 'create']) // Créer un nouveau club
      router.put('/:id', [ClubsController, 'update']) // Mettre à jour un club individuel
      router.delete('/:id', [ClubsController, 'destroy']) // Supprimer un club
    })
    .use(middleware.auth({
      guards: ['api']
    }))
    .prefix('/clubs')


}
