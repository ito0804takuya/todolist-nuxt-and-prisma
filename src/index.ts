import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addResolversToSchema } from '@graphql-tools/schema';
import path, { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schema = loadSchemaSync(join(__dirname, '../schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const resolvers = {
  Query: {
    // books Queryはbooksを返す
    books: () => books,
  },
};

// const server = new ApolloServer({
//   typeDefs, // 型
//   resolvers, // リゾルバ
// });
// schema.graphqlから生成した 型とリゾルバ
const schemaWithResolvers = addResolversToSchema({ schema, resolvers });

const server = new ApolloServer({ schema: schemaWithResolvers });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);