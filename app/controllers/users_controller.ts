import UserService from '#services/user_service';
import type { HttpContext } from '@adonisjs/core/http'
import { inject } from '@adonisjs/core'

@inject()
export default class UsersController {
  constructor(protected userService: UserService) { }
  async({ }: HttpContext) { }

  async index({ response }: HttpContext) {
    const users = await this.userService.getAllUsers();
    return response.json(users);
  }

  async show({ params, response }: HttpContext) {
    const user = await this.userService.getUserById(params.id);
    return response.json(user);
  }

  async delete({ params, response }: HttpContext) {
    const user = await this.userService.deleteUserById(params.id);
    return response.json(user);
  }

  async update({ params, request, response }: HttpContext) {
    const data = request.all();
    const user = await this.userService.updateUserById(params.id, data);
    return response.json(user);
  }

}