import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import Navbar from "./Navbar"
import Login from "../login/Login"
import FeedPage from "../feed/FeedPage"
import Register from "../register/Register"
import ProfilePage from "../profile/ProfilePage"
import { PrivateRoute, PublicRoute } from "../utils/authentication.js"

/**
 * Creates the App component.
 * @returns The app component.
 */
function App() {
  return (
    <Router>
      <header>
        <Navbar />
      </header>
      <div className="root">
        <Switch>
          <PublicRoute
            restricted={false}
            component={<div></div>}
            path="/"
            exact
          />
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
          <PrivateRoute component={FeedPage} path="/feed" exact />
          <PrivateRoute component={ProfilePage} path="/profile" exact />
        </Switch>
      </div>
    </Router>
  )
}

export default App
