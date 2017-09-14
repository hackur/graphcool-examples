# Email & Password Login (Instagram Example)

This example demonstrates how to implement a simple "Email & Password"-based authentication workflow with Graphcool. 

It therefore uses the [`email-password-authentication`](https://github.com/graphcool/modules/tree/master/authentication/email-password) module and customizes the `EmailUser` type that the module provides.


## Try it out

### Setup

To try out the example, first clone the repository and create your own Graphcool project based on the project definition:

```sh
git clone git@github.com:graphcool-examples/graphcool-examples.git
cd graphcool-examples/email-password-login-instagram
npm install -g graphcool@beta # if you don't have the latest CLI version installed
graphcool init 
```

`graphcool init` creates a new Graphcool project in your Graphcool account based on the project definition in [`graphcool.yml`](./graphcool.yml). It also creates a `.graphcoolrc` file where it adds this project as the default environment.

### Playground

First open a GraphQL playground:

```sh
graphcool playground
```

Then you can execute queries and mutations.

## Project Structure

### Overview

```
.
├── README.md
├── code
│   └── authenticatedEmailUser.js
├── graphcool.yml
├── modules
│   └── email-password
│       ├── code
│       │   ├── authenticate.js
│       │   └── signup.js
│       ├── graphcool.yml
│       ├── schemas
│       │   ├── authenticate.graphql
│       │   └── signup.graphql
│       └── types.graphql
├── schemas
│   └── authenticatedEmailUser.graphql
└── types.graphql
```



