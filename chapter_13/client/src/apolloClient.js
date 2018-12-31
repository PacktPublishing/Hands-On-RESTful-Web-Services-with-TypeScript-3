import { createBatchingNetworkInterface, ApolloClient } from 'apollo-client'

export const apolloClient = new ApolloClient({
  networkInterface: createBatchingNetworkInterface({
    uri: 'http://localhost:3000/graphql'
  }),
  connectToDevTools: true
})
