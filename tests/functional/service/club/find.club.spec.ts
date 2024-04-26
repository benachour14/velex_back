import Club from "#models/club";
import PortClubRepository from "#repositories/interfaces/club_interface";
import ClubService from "#services/club_service";
import app from '@adonisjs/core/services/app'
import { test } from '@japa/runner'
import { FakeClubRepository } from './base.js'

test.group('find club', () => {
    
    app.container.swap(PortClubRepository, () => {
      return new FakeClubRepository()
    })
  
    
    app.container.restore(ClubService)
})