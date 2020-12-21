'use strict'

const { test, trait } = use('Test/Suite')('User')
const Factory =  use('Factory')
const Config = use('Config')

trait('Test/ApiClient')
trait('DatabaseTransactions')

test('register_user_sucess', async ({ assert, client }) => {
  // const { username, email, password } = await Factory.model('App/Models/User').create()
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
  // const { username, email, password } = await Factory.model('App/Models/User').create()

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

