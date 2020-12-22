'use strict'

const Config = use('Config')

class UserLoginRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages () {
    return {
      'required': 'You must provide a {{ field }}.',
      'email': '{{ field }} was invalid.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.status(Config.get('staticdata.http_status_code.unprocessable_entity')).json(error);
  }
}

module.exports = UserLoginRequest
