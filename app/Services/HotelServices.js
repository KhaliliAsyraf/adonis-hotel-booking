'use strict'

const Database = use('Database')
const Hotel = use('App/Models/Hotel')
const Config = use('Config')
const Antl = use('Antl')

class HotelServices {
    async createHotel ({request}) {
        const { 
            name,
            address,
            is_active
        } = request.all();

        const trx = await Database.beginTransaction();
        try {
            const hotel = await Hotel.create(
                {
                    name,
                    address,
                    is_active
                },
                trx
            );

            const response = {
                message: Antl.formatMessage('messages.hotel_create_success'),
                http_status_code: Config.get('staticdata.http_status_code.success_data')
            }

            await trx.commit()
            return response
        } catch (e) {
            console.log(e)
            await trx.rollback()
            const response = {
                message: Antl.formatMessage('messages.hotel_create_fail'),
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
            return response
        }
    }

    async updateHotel ({params, request}) {
        let hotel = await Hotel.find(params.hotel_id)
        if (!hotel) {
            return {
                message: Antl.formatMessage('messages.hotel_not_found'),
                http_status_code: Config.get('staticdata.http_status_code.not_found')
            }
        }

        const trx = await Database.beginTransaction();
        try {
            await Hotel.query()
                .where('id', params.hotel_id)
                .update(request.all(),trx);

            const response = {
                message: Antl.formatMessage('messages.hotel_update_success'),
                http_status_code: Config.get('staticdata.http_status_code.success_data')
            }

            await trx.commit()
            return response
        } catch (e) {
            console.log(e)
            await trx.rollback()
            const response = {
                message: Antl.formatMessage('messages.hotel_update_fail'),
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
            return response
        }
    }
}

module.exports = HotelServices