'use strict'

const User = use('App/Models/User')
const user_services = use('App/Services/UserServices')
const Config = use('Config')

class AuthController {
    async register ({request, response}) {
        const res = await user_services.register({request});
        return response.status(Config.get('staticdata.http_status_code.success_data')).json(res)
    }

    async login ({ auth, request, response}) {
        const res = await user_services.login({ auth, request });
        return response.status(Config.get('staticdata.http_status_code.success_data')).json(res)
    }
}

module.exports = AuthController
