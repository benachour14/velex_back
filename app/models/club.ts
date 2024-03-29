import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Event from '#models/event'
import User from '#models/user'

export default class Club extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare logo: string

  @column()
  declare description: string

  @column()
  declare phone: string

  @column()
  declare email: string

  @column()
  declare location: string

  @column()
  declare facebook: string

  @hasMany(() => Event)
  declare events: HasMany<typeof Event>


  @manyToMany(() => User, {
    pivotTable: 'club_memberships',
    pivotColumns: ['role'],
  })
  declare members: ManyToMany<typeof User>

  @column()
  declare twitter: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
