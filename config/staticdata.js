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
        forbidden: 403,
        unauthorized: 403,
        not_found: 404,
        error: 500
    },

    token_type : {
        bearer: 'bearer',
        jwt: 'jwt'
    },

    public_covid_url: Env.get('PUBLIC_COVID_URL', '')
}