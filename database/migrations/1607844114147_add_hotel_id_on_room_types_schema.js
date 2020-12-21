'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddHotelIdOnRoomTypesSchema extends Schema {
  up () {
    this.table('room_types', (table) => {
      // alter table
      table.integer('hotel_id').references('id').inTable('hotels')
    })
  }

  down () {
    this.table('room_types', (table) => {
      // reverse alternations
      table.dropColumn('hotel_id')
    })
  }
}

module.exports = AddHotelIdOnRoomTypesSchema
