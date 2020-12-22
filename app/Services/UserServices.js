'use strict'

const Database = use('Database')
const User = use('App/Models/User')

class UserServices {
    static async register ({request}) {
        const { 
            username,
            email,
            password
        } = request.all();

        const trx = await Database.beginTransaction();
        const user = await User.create(
            {
                username,
                password,
                email
            },
            trx
        );
        trx.commit()
        const response = {
            'data': user.toJSON(),
            'status_code': '00'
        }
        
        return response
    }

    static async login ({ auth, request }) {
        const {email, password} = request.all();
        try {
            if (await auth.attempt(email, password)) {
                const trx = await Database.beginTransaction();

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
                    data: user
                }

                trx.commit()
                return response
            }
        } catch (e) {
            console.log(e)
            const response = {
                message: 'You are not registered!'
            }
            return response
        }
    }
}

module.exports = UserServices