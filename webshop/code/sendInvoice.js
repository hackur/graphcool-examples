'use latest'

const fromEvent = require('graphcool-lib').fromEvent

module.exports = function(event) {
  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')
  const data = event.data

  return sendEmail(data)
    .catch((error) => {
      console.log(error)

      return { error: error.message }
    })

  function sendEmail(data) {
    
    // send email

  }
}

