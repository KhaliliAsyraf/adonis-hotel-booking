'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory =  use('Factory')
const Config = use('Config')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('register_user_sucess', async ({ assert, client }) => {
  const data = {
    username: 'user1',
    email: 'user1@mail.com',
    password: '12345'
  }

  const response = await client.post('/api/v1/auth/register')
    .send(data)
    .end()

  delete response.body.data.id,
  delete response.body.data.updated_at,
  delete response.body.data.created_at
  delete data.password

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  assert.deepEqual(response.body.data, data)
})

test('register_user_validation_fail', async ({ assert, client }) => {
  const data = {
    email: 'user@mail.com',
    password: '12345'
  }

  const response = await client.post('/api/v1/auth/register')
    .send(data)
    .end()

  const expected_response = [
    {
      message: 'You must provide a username.',
      field: 'username',
      validation: 'required'
    }
  ]

  response.assertError(expected_response)
  response.assertStatus(Config.get('staticdata.http_status_code.unprocessable_entity'))
})

test('register_user_duplicate', async ({ assert, client }) => {
  const exist_user = await Factory.model('App/Models/User').create({
    email: 'user1@mail.com',
    password: '12345'
  })
  const data = {
    username: 'user1',
    email: 'user1@mail.com',
    password: '12345'
  }

  const response = await client.post('/api/v1/auth/register')
    .send(data)
    .end()

  const expected_response = [
    {
      message: 'email unique validation failed.',
      field: 'email',
      validation: 'unique'
    }
  ]

  response.assertError(expected_response)
  response.assertStatus(Config.get('staticdata.http_status_code.unprocessable_entity'))
})

test('login_user_sucess', async ({ assert, client }) => {
  const decrypt_password = 'secret'
  const user = await Factory.model('App/Models/User').create({
    email: 'user@email.com',
    password: decrypt_password
  })

  const data = {
    email: user.email,
    password: decrypt_password
  }

  const response = await client.post('/api/v1/auth/login')
    .send(data)
    .end()

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  response.assertJSONSubset({
    data: {
      username: user.username,
      email: user.email,
      type: Config.get('staticdata.token_type.bearer')
    }
  })
  assert.isDefined(response.body.data.token)
  assert.isDefined(response.body.data.type)
})

test('login_user_validation_fail', async ({ assert, client }) => {
  const decrypt_password = 'secret'
  const user = await Factory.model('App/Models/User').create({
    email: 'email.com',
    password: null
  })

  const data = {
    email: user.email,
    password: null
  }

  const expected_response = [
    {
      message: 'email was invalid.',
      field: 'email',
      validation: 'email'
    },
    {
      message: 'You must provide a password.',
      field: 'password',
      validation: 'required'
    }
  ]

  const response = await client.post('/api/v1/auth/login')
    .send(data)
    .end()

  response.assertStatus(Config.get('staticdata.http_status_code.unprocessable_entity'))
  response.assertError(expected_response)
})
