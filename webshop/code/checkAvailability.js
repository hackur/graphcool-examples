const fetch = require('node-fetch')
const fromEvent = require('graphcool-lib').fromEvent
const graphcool = fromEvent(event)
const api = graphcool.api('simple/v1')

module.exports = function(event) {
  const {data: {basketId, total}} = JSON.parse(event.body)

  return validate(basketId, total)
  .then(() => {data})
  .catch((error) => {
    console.log(error)

    return { error: error.message }
  })
}

function validate(basketId, total) {
  return api.request(`{
    basket: Basket(id: "${basketId}") {
      items { name price }
    }
  }`)
  .then((queryResult) => queryResult.basket)
  .then((basket) => {
    // check availability
    return fetch('http://mockbin.org/bin/5aea0d1d-fcad-4cf8-8227-3d2ed3702362')
    .then(r => r.json())
    .then((availability) => {
      for (const item of basket.items) {
        if (availablity[item.name] < 1) {
          throw new Error(`Item '${item.name}' out of stock`)
        }
      }
    })
  })
}
