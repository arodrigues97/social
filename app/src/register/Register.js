import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useMutation } from "@apollo/client"
import REGISTER from "./registerMutation"
import { useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"

/**
 * The styles to use for the Register page.
 */
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
}))

/**
 * Represents the Register page.
 * @author Adam Rodrigues
 * @returns The Register component.
 */
const Register = () => {
  /**
   * The mutation hook used to execute a register mutation.
   */
  const [register, { loading, error }] = useMutation(REGISTER, {
    onCompleted({ register }) {
      if (register) {
        setHasRegistered(true)
      }
    },
    onError({ error }) {
      setHasRegistered(false)
    },
  })

  /**
   * The first name reference stored in state.
   */
  const [firstName, setFirstName] = useState("")

  /**
   * The last name reference stored in state.
   */
  const [lastName, setLastName] = useState("")

  /**
   * The email reference stored in state.
   */
  const [email, setEmail] = useState("")

  /**
   * The password reference stored in state.
   */
  const [password, setPassword] = useState("")

  /**
   * The password repeat reference stored in state.
   */
  const [passwordRepeat, setPasswordRepeat] = useState("")

  /**
   *
   */
  const [hasRegistered, setHasRegistered] = useState(false)

  /**
   * The instance of the styles to use for the register page.
   */
  const classes = useStyles()

  /**
   * The reference to history.
   */
  const history = useHistory()

  /**
   * The method used when the register button is clicked.
   */
  function handleRegister() {
    register({
      variables: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordRepeat: passwordRepeat,
      },
    })
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.title} component="h1" variant="h5">
        Register
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first-name"
                  size="small"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last-name"
                  size="small"
                  type="text"
                  variant="outlined"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  size="small"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Repeat Password"
                  name="password-repeat"
                  size="small"
                  type="password"
                  variant="outlined"
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={handleRegister}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            {hasRegistered ? (
              <Alert severity="success">
                You have successfully registered - good job! You can login by
                clicking <Link to="/login">here</Link>
              </Alert>
            ) : (
              ""
            )}
            {error ? (
              <Alert severity="error">
                {error.graphQLErrors.map(({ message }) => {
                  return <span>{message}</span>
                })}
                {error.networkError
                  ? "Sorry, we are uanble to complete the request at this time."
                  : ""}
              </Alert>
            ) : (
              ""
            )}
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default Register
