'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hotel extends Model {
    static get table () {
        return 'hotels'
    }
}

module.exports = Hotel
