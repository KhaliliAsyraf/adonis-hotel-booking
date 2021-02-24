'use strict'

const { test, trait } = use('Test/Suite')('Public Test')
const Config = use('Config')

trait('Test/ApiClient')

test('test_get_covid_stats', async ({ assert, client }) => {
  var countryCode = 'MY'
  const response = await client.get('covid').query({ country_code: countryCode}).end()
  response.assertStatus(Config.get('staticdata.http_status_code.success_data'))
  response.assertJSONSubset({
    data: [{
      countryCode: countryCode,
      country: 'Malaysia',
    }]
  })
})
