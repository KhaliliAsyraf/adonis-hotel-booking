'use strict'

const { test, trait, beforeEach } = use('Test/Suite')('Hotel')
const Factory =  use('Factory')
const Config = use('Config')

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

test('test_create_hotel_success', async ({ assert, client }) => {
  const data = {
    name: 'Test Hotel',
    address: 'Rawang, Selangor',
    is_active: true
  }

  const response = await client.post('/api/v1/admin/hotel/create')
    .send(data)
    .loginVia(global.user, 'api')
    .end()

  const expected_response = {
    message: 'Hotel successfully created',
    http_status_code: 201
  }

  assert.deepEqual(response.body, expected_response)
  assert.isDefined(response.body.message)
  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
})

test('test_create_hotel_invalid_role', async ({ assert, client }) => {
    const user = await Factory.model('App/Models/User').create({
    email: 'user@customer.com',
    password: 'secret'
  })
  const roles = Config.get('staticdata.roles')

  const role = roles.findIndex(
    function (role) {
      return role == 'customer';
    })

  await user.roles().attach([role + 1])

  const data = {
    name: 'Test Hotel',
    address: 'Rawang, Selangor',
    is_active: true
  }

  const response = await client.post('/api/v1/admin/hotel/create')
    .send(data)
    .loginVia(user, 'api')
    .end()

  response.assertStatus(Config.get('staticdata.http_status_code.unauthorized'))

  // console.log(response.error.status)
})

test('test_update_hotel_success', async ({ assert, client }) => {
  const hotel = await Factory.model('App/Models/Hotel').create()
  const data = {
    name: 'Test Hotel',
    address: 'Rawang, Selangor',
    is_active: true
  }

  const response = await client.put(`/api/v1/admin/hotel/update/${hotel.id}`)
    .send(data)
    .loginVia(global.user, 'api')
    .end()

  const expected_response = {
    message: 'Hotel successfully updated',
    http_status_code: 201
  }

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  assert.deepEqual(response.body, expected_response)
})

test('test_update_hotel_not_found', async ({ assert, client }) => {
  const hotel = await Factory.model('App/Models/Hotel').create()
  const data = {
    name: 'Test Hotel',
    address: 'Rawang, Selangor',
    is_active: true
  }

  const response = await client.put(`/api/v1/admin/hotel/update/2`)
    .send(data)
    .loginVia(global.user, 'api')
    .end()

  const expected_response = {
    message: 'Hotel not found',
    http_status_code: 404
  }

  response.assertStatus(Config.get('staticdata.http_status_code.not_found'))
  assert.deepEqual(response.body, expected_response)
})
