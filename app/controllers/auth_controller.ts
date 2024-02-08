import type { HttpContext } from '@adonisjs/core/http'
import { authValidator, loginValidator } from '#validators/auth_validator'
import UserService from '#services/user_service'
import { inject } from '@adonisjs/core'


@inject()
export default class AuthController {
  constructor(protected userService: UserService) { }

  /**
   * register new user
   */
  async register({ request }: HttpContext) {
    const data = request.all()
    const payload = await authValidator.validate(data)

    try {
      const user = await this.userService.createUser(payload)
      return user
    } catch (error) {
      return { error: error }
    }

  }

  /**
   * login user
   */

  async login({ auth, request }: HttpContext) {
    const data = request.all()
    const payload = await loginValidator.validate(data)
    try {
      const user = await this.userService.login(payload)

      return user
    } catch (error) {
      return { error: error }
    }

  }

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) { }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) { }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) { }
}
