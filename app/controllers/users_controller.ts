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

}