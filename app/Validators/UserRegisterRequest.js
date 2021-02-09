'use strict'

const Config = use('Config')

class UserRegisterRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required',
      email: 'required|email|unique:users,email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'required': 'You must provide a {{ field }}.',
      'email': '{{ field }} was invalid.',
      'email.unique': '{{ field }} unique validation failed.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.status(Config.get('staticdata.http_status_code.unprocessable_entity')).json(error);
  }
}

module.exports = UserRegisterRequest
