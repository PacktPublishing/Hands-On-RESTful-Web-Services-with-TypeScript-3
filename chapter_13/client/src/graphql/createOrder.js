import gql from 'graphql-tag'

export const ADD_ORDER = gql`
  mutation addOrder($userId: Int!, $quantity: Int!, $status: String!, $complete: Boolean! ) {
    createOrder(userId: $userId, quantity: $quantity, status: $status, complete: $complete ) {
        userId,
        quantity,
        status,
        complete
    }
  }
`
