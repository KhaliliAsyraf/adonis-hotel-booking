'use strict'

const { test, trait, beforeEach, afterEach } = use('Test/Suite')('Admin')
const Factory =  use('Factory')
const Config = use('Config')
const Hash = use('Hash')
const UserServices = use('App/Services/UserServices')
const { ioc } = use('@adonisjs/fold')
const Database = use('Database')
const ace = require('@adonisjs/ace')

trait('Test/ApiClient')
trait('Auth/Client')
trait('DatabaseTransactions')

beforeEach(async () => {
  global.decrypt_password = 'secret'
  global.user = await Factory.model('App/Models/User').create({
    email: 'user@admin.com',
    password: decrypt_password
  })
  const roles = Config.get('staticdata.roles')

  const role = roles.findIndex(
    function (role) {
      return role == 'admin';
    })

  await global.user.roles().attach([role + 1])
})

afterEach(() => {
})

test('login_admin_sucess', async ({ assert, client }) => {
  const data = {
    email: global.user.email,
    password: global.decrypt_password
  }

  const response = await client.post('/api/v1/auth/login')
    .send(data)
    .loginVia(global.user, 'api')
    .end()

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  response.assertJSONSubset({
    data: {
      username: global.user.username,
      email: global.user.email,
      type: Config.get('staticdata.token_type.bearer')
    }
  })
  assert.isDefined(response.body.data.token)
  assert.isDefined(response.body.data.type)
})

test('logout_admin_sucess', async ({ assert, client }) => {
  const response = await client.get('/api/v1/auth/logout')
    .end()
  response.assertStatus(Config.get('staticdata.http_status_code.success'))
})
