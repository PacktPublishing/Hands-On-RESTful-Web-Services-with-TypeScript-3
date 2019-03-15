import gql from 'graphql-tag'

export const ORDER_BY_ID = gql`
  query orderById($id: ID!){
    listByOrderId(id: $id){ 
        userId,
        quantity,
        status,
        complete
    }
}`
