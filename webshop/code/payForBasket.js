'use latest'

const stripePkg = require('stripe')
const fromEvent = require('graphcool-lib').fromEvent

const stripe = stripePkg('Stripe_key')

module.exports = function(event) {
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const {data: {stripeToken, basketId}} = event.data

  return createOrder(basketId)
    .then((basketAndOrder) => {
      return charge(basketAndOrder, stripeToken)
      .then((paymentCompleted) => markOrderAsPaid(paymentCompleted, basketAndOrder.order))
    })
    .then((order) => ({data: {total: order.total}}))
    .catch((error) => {
      console.log(error)

      return { error: error.message }
    })

  function createOrder(basketId) {
    return api.request(
      `{
        Basket(id: ${basketId}){
          items {
            name
            price
          }
        }
      }`
    ).then((queryResult) => queryResult.Basket)
    
    .then((basket) => {
      const total = basket.items.reduce((acc, i) => acc + i.price, 0)
      
      return api.request(
        `mutation {
          createOrder(
            total: ${total}
            basketId: "${basketId}"
          ) {
            id
            total
          }
        }`
      ).then((mutationResult) => mutationResult.createOrder)
      
      .then((order) => {
        return {basket, order}
      })
    })
  }
  
  function charge(basketAndOrder, stripeToken) {
    const {basket, order} = basketAndOrder
  
    return stripe.charges.create({
      amount: order.total * 100, // stripe expects cents
      currency: 'eur',
      description: `Order id: ${order.id}`,
      source: order.stripeToken,
    })
    .then(() => {
      console.log(`Charge (${charge.receipt_number}) succeeded`)
      return true
    })
  }
  
  function markOrderAsPaid(paymentCompleted, order) {
    return api.request(
      `mutation {
        updateOrder(
          id: ${order.id}
          paymentCompleted: "${paymentCompleted}"
        ) {
          id
          total
        }
      }`
    ).then((mutationResult) => mutationResult.updateOrder)
  }
}

