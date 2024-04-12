import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clubs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('logo').nullable()
      table.string('description').nullable()
      table.string('phone').nullable()
      table.string('email').nullable()
      table.string('facebook').nullable()
      table.string('twitter').nullable()
      table.string('location').nullable()
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
