'use strict'

/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env')

module.exports = {
    roles: [
        'superadmin',
        'customer',
        'admin'
    ],

    http_status_code: {
        success: 200,
        success_data: 201,
        unprocessable_entity: 422,
        error: 500
    }
}