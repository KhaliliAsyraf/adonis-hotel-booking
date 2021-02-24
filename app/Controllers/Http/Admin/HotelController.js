'use strict'

const Hotel = use('App/Models/Hotel')
const HotelServices = use('App/Services/HotelServices')
const Config = use('Config')

class HotelController {
    async createHotel ({request, response}) {
        const hotel_services = new HotelServices()
        const res = await hotel_services.createHotel({request});
        return response.status(res.http_status_code).json(res)
    }

    async updateHotel ({params, request, response}) {
        const hotel_services = new HotelServices()
        const res = await hotel_services.updateHotel({params, request});
        return response.status(res.http_status_code).json(res)
    }
}

module.exports = HotelController
