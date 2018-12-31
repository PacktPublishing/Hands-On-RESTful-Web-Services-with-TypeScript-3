import app from './app'

// // Construct a schema, using GraphQL schema language
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `

// // Provide resolver functions for your schema fields
// const resolvers = {
//   Query: {
//     hello: () => 'Hello world!',
//   },
// }

// const server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers })

const PORT = process.env.PORT || 3000

app.listen(PORT)
