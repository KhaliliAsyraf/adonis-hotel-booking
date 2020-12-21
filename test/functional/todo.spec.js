'use strict'

const { test, trait } = use('Test/Suite')('Todo')

const Factory =  use('Factory')
const Todo = use('App/Models/Todo');

trait('Test/ApiClient')

// test('get list of posts', async ({ client }) => {
//   await Todo.create({
//     title: 'Adonis 102',
//     description: 'Blog post content'
//   })

//   const data = {
//     title: 'Adonis 102',
//     description: 'Blog post contents'
//   }

//   const response = await client.post('/store')
//     .send(data)
//     .end()

//   console.log('error', response.error)
//   response.assertStatus(201)
//   response.assertJSON([{
//     title: 'Adonis 102',
//     description: 'Blog post contents'
//   }])
// })
