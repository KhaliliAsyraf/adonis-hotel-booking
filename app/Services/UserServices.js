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
}

module.exports = UserServices