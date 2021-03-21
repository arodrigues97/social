import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {
  Button,
  makeStyles,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core"
import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { isAuthenticated, logout } from "../utils/authentication.js"
import userContext from "../user/userContext"

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
  },
}))

/**
 * Represents the navbar of the application.
 * @param {*} props The props passed.
 * @returns The component Navbar.
 */
const Navbar = (props) => {
  /**
   * The classes of styling to use.
   */
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
  const user = useContext(userContext).getUser

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

  const [anchorEl, setAnchorEL] = useState(null)

  const handleProfileClick = (event) => {
    setAnchorEL(event.currentTarget)
  }

  const handleProfileClose = () => {
    setAnchorEL(null)
  }

  console.log(JSON.stringify(user))
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
        Social
      </Typography>
      <Button color="inherit" onClick={() => redirect("/")}>
        Home
      </Button>
      <Button color="inherit" onClick={() => redirect("/feed")}>
        News Feed
      </Button>
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleProfileClick}
        >
          <Avatar src={user.profileImage}></Avatar>
        </Button>
        <Menu
          style={{ marginTop: "2.4rem" }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleProfileClose}
        >
          <MenuItem
            onClick={() => {
              handleProfileClose()
              redirect("/profile")
            }}
          >
            Profile
          </MenuItem>
          <MenuItem onClick={handleProfileClose}>Settings</MenuItem>
          <MenuItem
            onClick={() => {
              handleProfileClose()
              handleLogout()
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
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
        Social
      </Typography>
      <Button color="inherit" onClick={() => redirect("/")}>
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
