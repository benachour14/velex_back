import UserService from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserPolicy from '#policies/user_policy'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  async({}: HttpContext) {}

  async index({ bouncer, response }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('list')) {
      return response.forbidden('Cannot see the list of users')
    }
    const users = await this.userService.getAllUsers()
    return response.json(users)
  }

  async show({ bouncer, params, response }: HttpContext) {
    const userToShow = await this.userService.getUserById(params.id)
    if (!userToShow) {
      return response.notFound('User not found')
    }
    if (await bouncer.with(UserPolicy).denies('view', userToShow)) {
      return response.forbidden('Cannot see other users')
    }

    return response.json(userToShow)
  }

  async delete({ params, response }: HttpContext) {
    const user = await this.userService.deleteUserById(params.id)
    return response.json(user)
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all()
    const user = await this.userService.updateUserById(params.id, data)
    return response.json(user)
  }
}
