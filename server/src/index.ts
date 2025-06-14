import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'

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
    schema
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