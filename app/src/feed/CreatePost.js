import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  TextField,
} from "@material-ui/core"
import { useState } from "react"
import { gql, useMutation } from "@apollo/client"
import Alert from "@material-ui/lab/Alert"

/**
 * The mutation used to create a post.
 */
const CREATE_POST_MUTATION = gql`
  mutation CreatePost($post: String!) {
    createPost(post: $post) {
      id
      post
      user {
        id
        firstName
        lastName
      }
    }
  }
`
/**
 * The component of creating a post. Handles the execution of the mutation against the graphql server.
 * @returns The component of creating a post.
 */
const CreatePost = () => {
  /**
   * The create post use mutation hook.
   */
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    onError({ error }) {},
    update(cache, { data: { createPost } }) {
      cache.modify({
        fields: {
          post(exisistingPost = []) {
            const newPostRef = cache.writeFragment({
              data: createPost,
              fragment: gql`
                fragment NewPost on Post {
                  id
                  post
                  user {
                    id
                    firstName
                    lastName
                  }
                }
              `,
            })
            return [...exisistingPost, newPostRef]
          },
        },
      })
    },
  })

  /**
   * The typed post value in state.
   */
  const [post, setPost] = useState("")

  /**
   * The interaction when creating a post.
   */
  function handlePost() {
    createPost({
      variables: { post: post },
    })
    setPost("")
  }

  return (
    <div>
      <Card>
        <CardContent>
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
        <CardActionArea>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handlePost}>
              Post
            </Button>
            {error ? (
              <Alert severity="error">
                {error.graphQLErrors.map(({ message }) => {
                  return <span>{message}</span>
                })}
                {error.networkError
                  ? "Sorry, we are having some issues contacting the network."
                  : ""}
              </Alert>
            ) : (
              "'"
            )}
          </CardActions>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default CreatePost
