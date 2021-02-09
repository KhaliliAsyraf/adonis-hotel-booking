'use strict'

const PublicServices = use('App/Services/PublicServices')

class PublicController {
    async covidStatistics ({request, response}) {
        const public_services = new PublicServices()
        const res = await public_services.covidStatistics({request});
        return response.status(res.http_status_code).json(res)
    }
}

module.exports = PublicController
