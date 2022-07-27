const express = require("express");
const path = require("path");
const db = require("./config/connection");
const routes = require("./routes");
const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const http = require("http");
const { typeDefs, resolvers } = require('./schemas');
const { authMiddlewareGql } = require('./utils/auth')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: ({ req }) => authMiddlewareGql(req),
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  // if we're in production, serve client/build as static assets
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.use("/saved", express.static(path.join(__dirname, "../client/build")));

  await new Promise((resolve) => db.once("open", resolve));
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`);
};

startServer();
