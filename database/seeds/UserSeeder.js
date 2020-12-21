'use strict'

const config = use('Config')
const User = use('App/Models/User')
const Role = use('App/Models/Role')
const Hash = use('Hash')

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class UserSeeder {
  async run () {
    const roles = await Role
      .query()
      .select('id', 'name')
      .fetch();

    for (let i in roles.rows) {
      const role = roles.rows[i]
      const user = await User.findOrCreate(
        {
          username: role.name,
          email: role.name + '@mail.com',
          password: await Hash.make('secret')
        }
      )

      await user.roles().attach([role.id])
    }
  }
}

module.exports = UserSeeder
