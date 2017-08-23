export const subscription = gql`
  subscription {
    Post(filter: {
      operation: Created
    }) {
      node {
        title
      }
    }
  }
`

export default event => {

}