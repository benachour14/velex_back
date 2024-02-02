import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { authValidator } from '#validators/auth_validator'

export default class AuthController {
  /**
   * register new user
   */
  async register({ request }: HttpContext) {
    const data = request.all()
    const payload = await authValidator.validate(data)
    try {
      const user = await User.create(payload)

      return user
    } catch (error) {
      if (error.code === '23505') {
        return { error: 'Email already exists' }
      } else return { error: error }
    }
  }

  /**
   * login user
   */
  async login({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}
}
