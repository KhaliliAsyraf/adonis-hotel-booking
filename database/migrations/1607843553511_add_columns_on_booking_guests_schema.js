'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddColumnsOnBookingGuestsSchema extends Schema {
  up () {
    this.table('booking_guests', (table) => {
      // alter table
      table.integer('booking_id').references('id').inTable('bookings')
      table.integer('room_type_id').references('id').inTable('room_types')
    })
  }

  down () {
    this.table('booking_guests', (table) => {
      // reverse alternations
      table.dropColumn('booking_id')
      table.dropColumn('room_type_id')
    })
  }
}

module.exports = AddColumnsOnBookingGuestsSchema
