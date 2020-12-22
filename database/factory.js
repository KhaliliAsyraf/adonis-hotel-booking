'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', async (faker, i, data) => {
  return {
    username: data.username ? data.username : faker.username(),
    password: data.password ? data.password : faker.password(),
    email: data.email ? data.email : faker.email()
  }
})

Factory.blueprint('App/Models/Todo', (faker) => {
    return {
      title: faker.sentence(),
      description: faker.paragraph()
    }
  })
