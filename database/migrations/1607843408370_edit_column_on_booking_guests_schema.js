'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EditColumnOnBookingGuestsSchema extends Schema {
  up () {
    this.table('booking_guests', (table) => {
      // alter table
      table.renameColumn('citizenship', 'nationality')
    })
  }

  down () {
    this.table('booking_guests', (table) => {
      // reverse alternations
      table.dropColumn('nationality')
    })
  }
}

module.exports = EditColumnOnBookingGuestsSchema
