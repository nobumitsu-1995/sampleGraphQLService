import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { createContext } from './context'
import { GraphQLError, GraphQLFormattedError } from 'graphql'

const main = async () => {
  const app = express()

  // resolvers をインポートまたは定義する必要があります。例として空配列を指定します。
  const schema = await buildSchema({
    resolvers: [
      () => {}
    ],
    container: Container,
    emitSchemaFile: true,
  })

  const server = new ApolloServer({
    schema,
    context: createContext,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
      console.error("GraphQL Error Occurred:", JSON.stringify(error, null, 2))

      if (process.env.NODE_ENV !== 'production') {
        return error.toJSON()
      }

      if (!error.extensions?.code) {
        return {
          message: 'Internal server error. Please try again later.',
        }
      }

      return {
        message: error.message,
        locations: error.locations,
        path: error.path,
        extensions: { code: error.extensions.code },
      }
    }
  })

  await server.start()
  server.applyMiddleware({ app })

  const PORT = 4000

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  })
}

main().catch(error => {
  console.error(error)
})