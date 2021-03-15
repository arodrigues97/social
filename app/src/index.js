import React from "react"
import App from "./components/App"
import { render } from "react-dom"
import { ApolloProvider } from "@apollo/client"
import client from "./apollo"
import { BrowserRouter } from "react-router-dom"

/**
 * Wraps the App component under the BrowserRouter and ApolloProvider.
 * @returns The AppWrapper component
 */
const AppWrapper = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  )
}

render(<AppWrapper />, document.getElementById("root"))
