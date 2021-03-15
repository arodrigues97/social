import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import { Button, makeStyles, Typography } from "@material-ui/core"
import { useHistory } from "react-router-dom"
import { isAuthenticated, logout } from "../utils/authentication.js"

/**
 * Represents the styles used for the Navbar.
 */
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}))

/**
 * Represents the navbar of the application.
 * @param {*} props The props passed.
 * @returns The component Navbar.
 */
const Navbar = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position={"relative"}>
        {!isAuthenticated() ? (
          <GuestToolbar classes={classes}></GuestToolbar>
        ) : (
          <UserToolbar classes={classes}></UserToolbar>
        )}
      </AppBar>
    </div>
  )
}

/**
 * Represents the Toolbar to display when the user is logged in.
 * @param {*} props The props passed.
 * @returns The component UserToolbar.
 */
const UserToolbar = (props) => {
  /**
   * The instance created for history.
   */
  let history = useHistory()

  /**
   * The method used to redirect the route displayed.
   * @param {String} path The path to go to.
   */
  const redirect = (path) => {
    history.push(path)
  }

  /**
   * The method used to handle the logout interaction.
   */
  function handleLogout() {
    logout()
    redirect("/login")
  }

  return (
    <Toolbar>
      <Typography className={props.classes.title} variant="h6" noWrap>
        Social App
      </Typography>
      <Button color="inherit" onClick={() => redirect("/feed")}>
        News Feed
      </Button>
      <Button color="inherit" onClick={() => redirect("/profile")}>
        Profile
      </Button>
      <Button color="inherit" onClick={handleLogout}>
        Logout
      </Button>
    </Toolbar>
  )
}

/**
 * Represents the toolbar to display when the user is not logged in.
 * @param {*} props The props passed.
 * @returns The component GuestToolbar.
 */
const GuestToolbar = (props) => {
  /**
   * The instance created for history.
   */

  let history = useHistory()

  /**
   * The method used to redirect the route displayed.
   * @param {String} path The path to go to.
   */
  const redirect = (path) => {
    history.push(path)
  }

  return (
    <Toolbar>
      <Typography className={props.classes.title} variant="h6" noWrap>
        Social App
      </Typography>
      <Button color="inherit" onClick={() => redirect("/home")}>
        Home
      </Button>
      <Button color="inherit" onClick={() => redirect("/register")}>
        Register
      </Button>
      <Button color="inherit" onClick={() => redirect("/login")}>
        Login
      </Button>
    </Toolbar>
  )
}

export default Navbar
