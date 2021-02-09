'use strict'

const User = use('App/Models/User')
const UserServices = use('App/Services/UserServices')
const Config = use('Config')

class AuthController {
    async register ({request, response}) {
        const user_services = new UserServices()
        const res = await user_services.register({request});
        return response.status(res.http_status_code).json(res)
    }

    async login ({ auth, request, response}) {
        const user_services = new UserServices()
        const res = await user_services.login({ auth, request });
        return response.status(res.http_status_code).json(res)
    }

    async logout ({ auth, request, response}) {
        const user_services = new UserServices()
        const res = await user_services.logout({ auth, request });
        return response.status(res.http_status_code).send()
    }
}

module.exports = AuthController
