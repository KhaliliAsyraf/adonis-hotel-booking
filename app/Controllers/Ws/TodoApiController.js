'use strict'

class TodoApiController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = TodoApiController
