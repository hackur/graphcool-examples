# newsletter

## Getting Started

```sh
npm install -g graphcool@beta
git clone git@github.com:graphcool-examples/graphcool-examples.git
cd graphcool-examples/newsletter
graphcool init
```

## Configuration

You need to setup the following environment variables:

* `SENDGRID_API_KEY`: Sendgrid API Key
* `SENDER_EMAIL`: Sender email for newsletter

Setup an account and API Key for [Sendgrid](https://sendgrid.com/). An easy way to set up the environment variables is using [direnv](https://direnv.net/). To use `direnv`, create the following into `.envrc`, replacing `xxx` with your API Key and sender email.

```
export SENDGRID_API_KEY=xxx
export SENDER_EMAIL=xxx
```

## Features

- Collect newsletter subscribers
- New subscribers will receive a welcome email
- WIP: Send out batched newsletter emails

## Test the Code

Go to the Graphcool Playground:

```sh
graphcool playground
```

Hook into the function logs:

```sh
graphcool logs -f welcomeEmail --tail
graphcool logs -f sendEmail --tail # in a different terminal
```

Run this mutation to create a new subscriber:

```graphql
mutation {
  # replace __EMAIL__ with your email!
  createSubscriber(
    email: "__EMAIL__"
    firstName: "John"
    lastName: "Doe"
    isSubscribed: true
  ) {
    id
  }
}
```

A new welcome email should have been sent to the email you provided.
