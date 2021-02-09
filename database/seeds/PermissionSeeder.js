'use strict'

const config = use('Config')
const Permission = use('Adonis/Acl/Permission')
const Role = use('App/Models/Role')
const PermissionRole = use('App/Models/PermissionRole')

/*
|--------------------------------------------------------------------------
| PermissionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

const permissions = [
  {
    hotel: {
      group_display_name: 'Hotel Management',
      permission: [
        {
          create_hotel: {
            display_name: 'Create hotel',
            role_access: [
              'superadmin',
              'admin'
            ]
          }
        },
        {
          get_hotel_list: {
            display_name: 'Get hotel list',
            role_access: [
              'superadmin',
              'customer',
              'admin'
            ]
          },
        }
      ]
    }
  },
  {
    booking: {
      group_display_name: 'Booking Management',
      permission: [
        {
          confirm_booking: {
            display_name: 'Customer confirm booking',
            role_access: [
              'superadmin',
              'customer'
            ]
          }
        },
        {
          cancel_booking: {
            display_name: 'Customer cancel booking',
            role_access: [
              'superadmin',
              'customer'
            ]
          },
        }
      ]
    }
  }
]

class PermissionSeeder {
  async run () {
    PermissionRole.truncate()
    Permission.truncate()
    // permission grouping
    for (let i in permissions) {
      const permission_grouping = permissions[i];

      // array of permission
      for (let k in permission_grouping) {
        const permission_array = permission_grouping[k]
        const group_display_name = permission_array.group_display_name
        // scope of permission
        for (let y in permission_array.permission) {
          const permission_scope = permission_array.permission[y]

          // get specific permission
          for (let a in permission_scope) {
            const permission = permission_scope
            const keys = Object.keys(permission)[0]
            const new_permission = await Permission.create(
              {
                name: permission[keys].display_name,
                slug: keys,
                group: group_display_name,
                description: permission[keys].display_name
              }
            )

            for (let d in permission[keys].role_access) {
              const role_name = permission[keys].role_access[d]
              const role = await Role.query().where('slug', role_name).first()
              await role.permissions().attach([new_permission.id])
            }
          }
        }
      }
    }
  }
}

module.exports = PermissionSeeder
