import gql from 'graphql-tag'

export const ALL_ORDERS_QUERY = gql`{
    
    allOrders{
        id,
        userId,
        quantity
    }
    
 }
`
