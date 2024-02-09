import router from '@adonisjs/core/services/router'
import UsersController from '#controllers/users_controller'

export default function authRoutes() {
    router
        .group(() => {
            router.get('/:id', [UsersController, 'show']) // register new user
            router.put('/:id', [UsersController, 'update']) // register new user
            router.delete('/:id', [UsersController, 'delete']) // register new user

        })
        .prefix('/users')
}
