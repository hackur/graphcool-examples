const fromEvent = require('graphcool-lib').fromEvent

module.exports = function(event) {
  const secret = event.data.secret
  const name = event.data.name
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  
  function getExistingCustomer(secret) {
    return api.request(`
    query {
      Customer(secret: "${secret}"){
        id
      }
    }`)
      .then((queryResult) => {
        if (queryResult.error) {
          return Promise.reject(queryResult.error)
        } else {
          return queryResult.Customer
        }
      })
  }

  function createCustomer(name, secret) {
    return api.request(`
      mutation {
        createCustomer(
          name: "${name}"
          secret: "${secret}"
        ){
          id
        }
      }`)
      .then((mutationResult) => {
        return mutationResult.createCustomer.id
      })
  }

  function generateGraphcoolToken(customerId) {
    return graphcool.generateAuthToken(customerId, 'Customer')
  }

  return getExistingCustomer(secret)
  .then((customer) => {
    if (customer === null) {
      return createCustomer(name, secret)
    } else {
      return customer.id
    }
  })
  .then(generateGraphcoolToken)
  .then((token) => {
    return { data: { token: token } }
  })
  .catch((error) => {
    console.log(error)

    // In a production app you should not expose an internal error to the user.
    // Instead catch specific errors and return meaningful messages.
    return { error: error }
  })
}