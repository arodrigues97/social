import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  TextField,
  Avatar,
  CardHeader,
  makeStyles,
} from "@material-ui/core"
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import client from "../../apollo"
import Alert from "@material-ui/lab/Alert"
import GET_FEED from "../../feed/getFeedQuery.js"
import CREATE_POST from "./createPostMutation.js"
import GET_PROFILE_POSTS from "../profile/getProfilePosts.js"

/**
 * Represents the styling of the Create Post component.
 */
const useStyles = makeStyles((theme) => ({
  cardContent: {
    margin: 0,
  },
  cardHeader: {
    padding: theme.spacing(2),
  },
}))

/**
 * The component of creating a post. Handles the execution of the mutation against the graphql server.
 * @author Adam Rodrigues
 * @returns The component of creating a post.
 */
const CreatePost = (props) => {
  /**
   * The typed post value in state.
   */
  const [post, setPost] = useState("")

  /**
   * The classes to style with.
   */
  const classes = useStyles()

  /**
   * The create post use mutation hook.
   */
  const [createPost, { error }] = useMutation(CREATE_POST, {
    update: (cache, { data }) => {
      const existingFeed = cache.readQuery({
        query: GET_FEED,
        variables: { offset: 0 },
      })
      cache.writeQuery({
        query: GET_FEED,
        data: { getFeed: [data.createPost, ...existingFeed.getFeed] },
      })
    },
    onCompleted: () => {
      setPost("")
    },
  })

  /**
   * The interaction when creating a post.
   */
  function handlePost() {
    createPost({
      variables: { post: post },
    })
  }

  return (
    <div>
      <Card>
        <CardHeader
          title={props.user.firstName + " " + props.user.lastName}
          className={classes.cardHeader}
          avatar={
            <Avatar src="https://avatars.githubusercontent.com/u/36482887?s=460&u=4babd11bd036d847b91f98c500e652c2ce55e329&v=4"></Avatar>
          }
        ></CardHeader>
        <CardContent className={classes.cardContent}>
          <TextField
            multiline
            rows={2}
            rowsMax={12}
            fullWidth
            helperText={"What's on your mind?"}
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handlePost}>
            Post
          </Button>
          {error ? (
            <Alert severity="error">
              {JSON.stringify(error.graphQLErrors) +
                ", " +
                JSON.stringify(error.networkError)}
            </Alert>
          ) : (
            ""
          )}
        </CardActions>
      </Card>
    </div>
  )
}

export default CreatePost
