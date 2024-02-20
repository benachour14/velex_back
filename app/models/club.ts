import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Event from './event.js'

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
  declare event: HasMany<typeof Event>

  @column()
  declare twitter: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
