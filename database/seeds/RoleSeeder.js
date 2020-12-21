'use strict'

const config = use('Config')
const Role = use('Adonis/Acl/Role')

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class RoleSeeder {
  async run () {
    const roles = config.get('staticdata.roles');
    var i = 0;
    for (i = 0; i < roles.length; i++) {
      const role = await Role.create(
        {
          name: roles[i],
          slug: roles[i],
          description: null
        }
      )
    }
  }
}

module.exports = RoleSeeder
