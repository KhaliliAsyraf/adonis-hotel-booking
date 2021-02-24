'use strict'

const Database = use('Database')
const Hotel = use('App/Models/Hotel')
const Config = use('Config')

class ClientHelpers {
    async clientExec ({url, method, accept, data = null}) {
        var axios = require('axios');
        
        var config = {
            method: method,
            url: url,
            headers: { 
              'Accept': accept
            },
            data: data
          };
          
          const response = await axios(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            return response = {
                data: response.data,
                http_status_code: Config.get('staticdata.http_status_code.success_data')
            }
          })
          .catch(function (error) {
            return response = {
                message: 'Request call fail',
                http_status_code: Config.get('staticdata.http_status_code.error')
            }
          });
        return response
    }
}

module.exports = ClientHelpers