import React from "react"
import { Route, Redirect } from "react-router-dom"

/**
 * This file is used for authentication related functions/constants.
 * @author Adam Rodrigues
 */

/**
 * The auth token identifier in the local storage
 */
export const AUTH_TOKEN = "auth-token"

/**
 * Checks if the authentication token is set
 */
function isAuthenticated() {
  const token = localStorage.getItem(AUTH_TOKEN)
  return token != null
}

/**
 * Performs the authentication login task by setting the authentication tokens value.
 * @param {string} token
 */
function login(token) {
  localStorage.setItem(AUTH_TOKEN, token)
  window.location.reload(false)
}


/**
 * Logs the user out by removing the authentication token.
 */
function logout() {
  localStorage.removeItem(AUTH_TOKEN)
  window.location.reload(false)
}

/**
 * @see https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
 * @param {*} param0
 * @returns
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

/**
 * @see https://medium.com/@thanhbinh.tran93/private-route-public-route-and-restricted-route-with-react-router-d50b27c15f5e
 * @param {*} param0
 * @returns
 */
const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() && restricted ? (
          <Redirect to="/feed" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export { isAuthenticated, logout, login, PrivateRoute, PublicRoute }
