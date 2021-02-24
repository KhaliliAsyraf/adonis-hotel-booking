'use strict'

const Database = use('Database')
const Hotel = use('App/Models/Hotel')
const ClientHelpers = use ('App/Helpers/ClientHelpers')
const Config = use('Config')

class PublicServices {
    async covidStatistics ({request}) {
        var url = Config.get('staticdata.public_covid_url') + request.input('country_code')
        var method = 'get'
        var accept = 'application/json'

        const client_helpers = new ClientHelpers()
        const res = await client_helpers.clientExec({url, method, accept});

        if (res.http_status_code) {
            return res
        } else {
            return res
        }
    }
}

module.exports = PublicServices