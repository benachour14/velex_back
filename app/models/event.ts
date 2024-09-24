import { BaseModel, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Club from '#models/club'
import User from '#models/user'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string

  @column()
  declare location: object

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare clubId: number

  @belongsTo(() => Club)
  declare club: BelongsTo<typeof Club>

  @manyToMany(() => User, {
    pivotTable: 'event_participants',
  })
  declare participants: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
