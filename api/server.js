import {
  ApolloServer,
  gql,
  ApolloError,
  UserInputError,
  AuthenticationError,
} from "apollo-server"
import prismaPkg from "@prisma/client"
const { PrismaClient } = prismaPkg
import { importSchema } from "graphql-import"
import { getUser, getToken } from "./utils/auth.js"
import { resolvers } from "./resolvers/resolvers.js"

const typeDefs = importSchema("./schema.graphql")

const prisma = new PrismaClient()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: function (req) {
    return { ...req, prisma }
  },
})

server.listen().then(({ url }) => {
  console.log("Server is listenijng on " + url)
})
