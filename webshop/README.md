# Graphcool Webshop

## Getting Started

```
graphcool init
```

## Config
This example needs an environment variable called `STRIPE_KEY`.
The `STRIPE_KEY` can be obtained by [creating a stripe account](https://dashboard.stripe.com/register)
and getting the token from the Account Settings.

## Data Setup

You can open the playground with `graphcool playground` and execute the following mutation to set up data.
```graphql
mutation init {
  createUser(
    firstName: "Bob"
    lastName: "Meyer"
    email: "bob.meyer@test.com"
    address: "Secret Address"
    baskets: [{
      items: [{
        name: "iPhone X"
        price: 1200
        imageUrl: "https://cdn.vox-cdn.com/uploads/chorus_image/image/56645405/iphone_x_gallery1_2017.0.jpeg"
        description: "The new shiny iPhone"
      }]
    }]
  ) {
    id
    baskets {
      id
    }
  }
}
```

## Application Flow
 1. Obtain a Stripe token by using the **Try Now** example in their docs: https://stripe.com/docs
 2. Create a new Order in Graphcool with the Stripe Token, the `userId` and `basketId` you just created:
 ```graphql

mutation order {
  createOrder(userId: "cj7kn28nn6fa90117qjwnut9v" stripeToken: "tok_ybnh1HWnDZKMonE6lVkHLMVt" basketId: "cj7kn28no6faa01175c8rsgsd") {
    id
  }
}
 ```
 3. Pay the Order that you just created by calling the custom resolver:
 ```graphql

mutation pay {
  pay(orderId: "cj7knpozv7t6f01535quuud9s") {
    success
  }
}
 ```