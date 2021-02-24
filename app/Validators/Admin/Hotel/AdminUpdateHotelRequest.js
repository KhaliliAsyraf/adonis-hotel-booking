'use strict'

class AdminUpdateHotelRequest {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      name: 'required|string',
      address: 'required|string',
      is_active: 'required|boolean'
    }
  }

  get messages () {
    return {
      'required': 'You must provide a {{ field }}.'
    }
  }

  async fails(error) {
    this.ctx.session.withErrors(error)
      .flashAll();
    return this.ctx.response.status(Config.get('staticdata.http_status_code.unprocessable_entity')).json(error);
  }
}

module.exports = AdminUpdateHotelRequest
