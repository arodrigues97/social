import { BrowserRouter as Router, Switch } from "react-router-dom"
import Navbar from "./Navbar"
import Login from "../login/Login"
import FeedContainer from "../feed/FeedContainer"
import Register from "../register/Register"
import ProfilePage from "../profile/ProfilePage"
import HomePage from "../home/HomePage"
import UserProvider from "../user/UserProvider"
import { PrivateRoute, PublicRoute } from "../utils/authentication.js"
import { isAuthenticated } from "../utils/authentication"

/**
 * Creates the App component.
 * @returns The app component.
 */
const App = () => {
  if (isAuthenticated()) {
    return (
      <UserProvider>
        <Routes />
      </UserProvider>
    )
  }
  return <Routes />
}

/**
 * Wrapps the possible routes under component Routes to allow conditonal use of UserProvider.
 */
const Routes = () => {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <div className="root">
        <Switch>
          <PublicRoute
            restricted={true}
            component={Register}
            path="/register"
            exact
          />
          <PublicRoute
            restricted={true}
            component={Login}
            path="/login"
            exact
          />
          <PublicRoute
            restricted={false}
            component={HomePage}
            path="/"
            exact
          ></PublicRoute>
          <PrivateRoute component={FeedContainer} path="/feed" exact />
          <PrivateRoute component={ProfilePage} path="/profile" exact />
        </Switch>
      </div>
    </Router>
  )
}

export default App
