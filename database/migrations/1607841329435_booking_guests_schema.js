'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingGuestsSchema extends Schema {
  up () {
    this.create('booking_guests', (table) => {
      table.increments()
      table.string('name')
      table.integer('age')
      table.string('ic')
      table.string('citizenship')
      table.timestamps()
    })
  }

  down () {
    this.drop('booking_guests')
  }
}

module.exports = BookingGuestsSchema
