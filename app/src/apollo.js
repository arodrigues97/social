import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { FastRewind } from "@material-ui/icons"
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
  cache: new InMemoryCache({
    /*typePolicies: {
      Query: {
        fields: {
          getFeed: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming]
            },
          },
        },
      },
    },*/
  }),
  connectToDevTools: true,
  defaultOptions: {
    query: {
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
    watchQuery: {
      fetchPolicy: "cache-and-network",
    },
  },
})

export default client
