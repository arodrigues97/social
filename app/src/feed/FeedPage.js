import {
  Card,
  Container,
  makeStyles,
  CardContent,
  Typography,
  Portal,
} from "@material-ui/core"
import Post from "../components/Post"
import CreatePost from "./CreatePost"
import { gql, useQuery } from "@apollo/client"

/**
 * Represents the query to fetch for the feed.
 */
export const GET_FEED_QUERY = gql`
  query {
    getFeed {
      id
      post
      user {
        id
        firstName
        lastName
      }
      likes {
        id
        user {
          id
        }
      }
      likesCount
      likedByUser
    }
  }
`

/**
 * Creates the styling of the feed page.
 */
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
}))

/**
 * Creates the feed page component and handles the executing of the feed query.
 * @returns The feed page component.
 */
const FeedPage = () => {
  /**
   * The instance of the styling to use.
   */
  const classes = useStyles()

  /**
   * The query hook to fetch the feed.
   * Temporarily using polling intervals to further investigate why the UI is not updating upon cache updating.
   */
  const { loading, error, data } = useQuery(GET_FEED_QUERY, {
    errorPolicy: "all",
    pollInterval: 100,
    fetchPolicy: "cache-and-network",
  })

  return (
    <Container className={classes.container} maxWidth="sm">
      <CreatePost />
      {loading ? <Typography variant="h6">Loading...</Typography> : ""}
      {error ? <span>{JSON.stringify(error)}</span> : ""}
      {data
        ? data.getFeed.map((post, index) => {
            return (
              <Post
                id={post.id}
                poster={post.user.firstName + " " + post.user.lastName}
                post={post.post}
                likesCount={post.likesCount}
                isLiked={post.likedByUser}
              />
            )
          })
        : ""}
    </Container>
  )
}

export default FeedPage
