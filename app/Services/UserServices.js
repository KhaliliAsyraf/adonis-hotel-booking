'use strict'

const Database = use('Database')
const User = use('App/Models/User')
const Config = use('Config')

class UserServices {
    async register ({request}) {
        const { 
            username,
            email,
            password
        } = request.all();

        const trx = await Database.beginTransaction();
        try {
            const user = await User.create(
                {
                    username,
                    password,
                    email
                },
                trx
            );

            const response = {
                data: user.toJSON(),
                http_status_code: Config.get('staticdata.http_status_code.success_data')
            }

            await trx.commit()
            return response
        } catch (e) {
            console.log(e)
            await trx.rollback()
            const response = {
                message: 'You are not registered!',
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
            return response
        }
    }

    async login ({ auth, request }) {
        const {email, password} = request.all();

        const trx = await Database.beginTransaction();
        try {
            if (await auth.attempt(email, password)) {
                let user = await User.findBy('email', email)
                const token = await auth.generate(user)

                Object.assign(user, token)
                user = user.toJSON()
                
                let unset = [
                    'id',
                    'created_at',
                    'updated_at'
                ];
                for (let i in unset) {
                    const hide = unset[i]
                    delete user[hide];
                }
                
                const response = {
                    data: user,
                    http_status_code: Config.get('staticdata.http_status_code.success_data')
                }

                await trx.commit()
                return response
            }
        } catch (e) {
            console.log(e)
            const response = {
                message: 'You are not registered!',
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
            return response
        }
    }

    async logout ({ auth, request }) {
        try {
            await auth
                .authenticator('api')
                .revokeTokens()
            const response = {
                http_status_code: Config.get('staticdata.http_status_code.success')
            }
            return response
          } catch (error) {
            const response = {
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
            return response
          }
    }
}

module.exports = UserServices