const fromEvent = require('graphcool-lib').fromEvent

module.exports = function(event) {
  console.log(event)

  if (!process.env['SENDER_EMAIL']) {
    console.log('Please provide a valid sender email!')
    return { error: 'Newsletter not configured correctly.' }
  }

  const graphcool = fromEvent(event)
  const api = graphcool.api('simple/v1')

  const fromEmail = process.env['SENDER_EMAIL']


  const subscriber = event.data.Subscriber.node

  if (subscriber) {
    console.log(`A new user subscribed: ${subscriber.firstName} ${subscriber.lastName} (${subscriber.email})`)

    // create welcome email for new subscriber
    const mutation = `
      mutation welcomeEmail(
        $fromEmail: String!
        $toEmail: String!
        $subject: String!
        $content: String!
      ) {
        createSendgridEmail(
          fromEmail: $fromEmail
          toEmail: $toEmail
          subject: $subject
          content: $content
        ) {
          id
        }
      }
    `

    const variables = {
      fromEmail: fromEmail,
      toEmail: subscriber.email,
      subject: `Welcome to the newsletter, ${subscriber.firstName}!`,
      content: `Hey ${subscriber.firstName}, thanks for subscribing to the newsletter! We will send you awesome emails regularly.`,
    }

    return api.request(mutation, variables)
      .then(data => {
        console.log(data)
        return {}
      })
      .catch(error => {
        console.log(error)
        return {}
      })
  } else {
    console.log('An unexpected error occured.')
  }
}
