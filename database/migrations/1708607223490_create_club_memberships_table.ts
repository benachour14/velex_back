import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'club_memberships'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('club_id').unsigned().references('id').inTable('clubs').onDelete('CASCADE')
      table
        .enu('role', ['USER', 'ADMIN'], {
          useNative: true,
          enumName: 'menber_role',
          existingType: false,
        })
        .notNullable()
        .defaultTo('USER')
      table.unique(['user_id', 'club_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.raw('DROP TYPE IF EXISTS "menber_role";')
  }
}
