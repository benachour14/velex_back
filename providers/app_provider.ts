import type { ApplicationService } from '@adonisjs/core/types'

import ClubRepository from '#repositories/club_repository.js'
import EventRepository from '#repositories/event_repository.js'
import PortClubRepository from '#repositories/interfaces/club_interface'
import PortEventRepository from '#repositories/interfaces/event_interface'
import PortUserRepository from '#repositories/interfaces/user_interface'
import UserRepository from '#repositories/user_repository.js'

export default class AppProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    this.app.container.bind(PortClubRepository, () => this.app.container.make(ClubRepository))
    this.app.container.bind(PortEventRepository, () => this.app.container.make(EventRepository))
    this.app.container.bind(PortUserRepository, () => this.app.container.make(UserRepository))
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {}

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {}
}
