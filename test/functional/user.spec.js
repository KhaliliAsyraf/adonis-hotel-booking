'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory =  use('Factory')
const Config = use('Config')
const Hash = use('Hash')

trait('Test/ApiClient')
trait('DatabaseTransactions')
// trait('Auth/Client')
// trait('Session/Client')

test('register_user_sucess', async ({ assert, client }) => {
  const data = {
    username: 'user1',
    email: 'user1@mail.com',
    password: '12345'
  }

  const response = await client.post('/api/register')
    .send(data)
    .end()

  delete response.body.data.id,
  delete response.body.data.updated_at,
  delete response.body.data.created_at
  delete data.password

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  assert.deepEqual(response.body.data, data)
  // response.assertJSON([{
  //   title: 'Adonis 102',
  //   description: 'Blog post contents'
  // }])
})

test('register_user_validation_fail', async ({ assert, client }) => {
  const data = {
    email: 'user1@mail.com',
    password: '12345'
  }

  const response = await client.post('/api/register')
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

  const response = await client.post('/api/login')
    .send(data)
    .end()

  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  assert.isDefined(response.body.data.token)
  assert.isDefined(response.body.data.type)
})

