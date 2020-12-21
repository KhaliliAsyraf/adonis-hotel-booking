'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HotelsSchema extends Schema {
  up () {
    this.create('hotels', (table) => {
      table.increments()
      table.string('name')
      table.text('address')
      table.boolean('is_active').defaultTo(true)
      table.timestamps()
    })
  }

  down () {
    this.drop('hotels')
  }
}

module.exports = HotelsSchema
