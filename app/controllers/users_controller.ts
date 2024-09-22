import UserService from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'
import UserPolicy from '#policies/user_policy'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) {}
  async({}: HttpContext) {}

  async index({ bouncer, response, auth }: HttpContext) {
    if (await bouncer.with(UserPolicy).denies('list')) {
      return response.forbidden('You dont have the right. Cannot see the list of users')
    }
    const users = await this.userService.getAllUsers()
    return response.json(users)
  }

  async show({ bouncer, params, response, auth }: HttpContext) {
    const userToShow = await this.userService.getUserById(params.id)
    if (!userToShow) {
      return response.notFound('User not found')
    }
    if (await bouncer.with(UserPolicy).denies('view', userToShow)) {
      return response.forbidden('Cannot see other users')
    }

    return response.json(userToShow)
  }

  async delete({ bouncer, params, response }: HttpContext) {
    const user = await this.userService.deleteUserById(params.id)

    if (await bouncer.with(UserPolicy).denies('delete', params.id)) {
      return response.forbidden('Cannot deleta others users')
    }
    return response.json(user)
  }

  async update({ bouncer, params, request, response }: HttpContext) {
    const data = request.all()
    const user = await this.userService.updateUserById(params.id, data)

    if (await bouncer.with(UserPolicy).denies('update', params.id)) {
      return response.forbidden('Cannot update other users')
    }

    return response.json(user)
  }
}
