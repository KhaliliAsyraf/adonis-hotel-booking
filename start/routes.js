'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('welcome')

Route.group(() => {
  // Auth
  Route
    .post('/auth/login', 'AuthController.login')
    .validator('UserLoginRequest')
  Route
    .post('/auth/register', 'AuthController.register')
    .validator('UserRegisterRequest')
  Route.get('/auth/logout', 'AuthController.logout')

  // Hotel
  Route
    .post('/admin/hotel/create', 'Admin/HotelController.createHotel')
    .middleware(['auth:api', 'can:create_hotel'])
    .validator('Admin/Hotel/AdminCreateHotelRequest')
  Route
    .put('/admin/hotel/update/:hotel_id', 'Admin/HotelController.updateHotel')
    .middleware(['auth:api', 'can:update_hotel'])
    .validator('Admin/Hotel/AdminUpdateHotelRequest')
})
// .middleware(['auth:api'])
.prefix('/api/v1')

Route.get('/', 'TodoController.index').as('Todo.index')
Route.get('/create', 'TodoController.create').as('Todo.create')
Route.get('/edit/:id', 'TodoController.edit').as('Todo.edit')
Route.get('/delete/:id', 'TodoController.delete').as('Todo.delete')
Route.post('/store', 'TodoController.store').as('Todo.store')
Route.post('/update/:id', 'TodoController.update').as('Todo.update')

Route.get('/covid', 'PublicController.covidStatistics').as('public.covid-statistics')

// Route.post('/api/store', 'TodoController.store').as('api.Todo.store')
