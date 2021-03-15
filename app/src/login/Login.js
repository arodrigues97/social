import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import Alert from "@material-ui/lab/Alert"
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import { login as authLogin } from "../utils/authentication.js"
import { useHistory } from "react-router"

/**
 * The styles to use for the login page.
 */
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(8),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  formInput: {
    width: "100%",
  },
}))

/**
 * The login mutation to send to the server.
 */
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
      }
    }
  }
`

/**
 * Creates the login component.
 * @returns The Login component.
 */
const Login = () => {
  /**
   * The classes used in styling.
   */
  const classes = useStyles()

  /**
   * The history instance.
   */
  let history = useHistory()

  /**
   * The hook used to execute and handle the login mutation.
   */
  const [login, { error }] = useMutation(LOGIN_MUTATION, {
    onCompleted({ login }) {
      if (login) {
        authLogin(login.token)
        history.push("/feed")
      }
    },
    onError({ error }) {},
  })

  /**
   * The email value in state.
   */
  const [email, setEmail] = useState("")

  /**
   * The password value in state.
   */
  const [password, setPassword] = useState("")

  function handleLogin() {
    login({
      variables: { email: email, password: password },
    })
  }

  return (
    <Container className={classes.container} maxWidth="xs">
      <Typography className={classes.title} component="h1" variant="h5">
        Sign in
      </Typography>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  className={classes.formInput}
                  fullWidth
                  label="Email"
                  name="email"
                  size="small"
                  variant="outlined"
                  type="email"
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
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              fullWidth
              variant="contained"
              onClick={() => handleLogin()}
            >
              Log in
            </Button>
          </Grid>
          {error ? (
            <Grid item xs={12}>
              <Alert severity="error">
                {error.graphQLErrors.map(({ message }) => {
                  return <span>{message}</span>
                })}
                {error.networkError
                  ? "Sorry, we are uanble to complete the request at this time."
                  : ""}
              </Alert>
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </form>
    </Container>
  )
}

export default Login
