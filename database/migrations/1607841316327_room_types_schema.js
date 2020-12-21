'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoomTypesSchema extends Schema {
  up () {
    this.create('room_types', (table) => {
      table.increments()
      table.string('name')
      table.string('type')
      table.decimal('price', 2)
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('room_types')
  }
}

module.exports = RoomTypesSchema
