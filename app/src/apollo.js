import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "apollo-link-context"
import { AUTH_TOKEN } from "./utils/authentication.js"

/**
 * The url at which the API server is hosted at.
 */
const API_ENDPOINT = "http://localhost:4000"

/**
 * The HTTP link .
 */
const httpLink = createHttpLink({ uri: API_ENDPOINT })

/**
 * The authentication link.
 */
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  }
})

/**
 * The apollo client.
 */
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
})

export default client
