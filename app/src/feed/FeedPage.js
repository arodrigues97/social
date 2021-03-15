import {
  Button,
  Container,
  LinearProgress,
  makeStyles,
} from "@material-ui/core"
import Post from "../components/post/Post"
import CreatePost from "../components/post/CreatePost"
import Alert from "@material-ui/lab/Alert"
import { useLazyQuery } from "@apollo/client"
import GET_FEED from "./getFeedQuery"
import { useEffect, useRef, useState } from "react"

/**
 * Creates the styling of the feed page.
 */
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  error: {
    margin: theme.spacing(2),
  },
  postList: {
    listStyle: "none",
    padding: "0",
  },
}))

/**
 * Creates the feed page component and handles the executing of the feed query.
 * @author Adam Rodrigues
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
  const [getFeed, { loading, error, data }] = useLazyQuery(GET_FEED, {
    onCompleted({ getFeed }) {
      scrollRef.current.scrollIntoView()
    },
  })

  /**
   * The offset used for loading more feed.
   */
  const [feedOffset, setFeedOffset] = useState(0)

  /**
   * Used to scroll to bottom on load more feed event.
   */
  const scrollRef = useRef(null)

  useEffect(() => {
    getFeed({ variables: { offset: feedOffset } })
  }, [feedOffset, getFeed])

  return (
    <Container className={classes.container} maxWidth="sm">
      <CreatePost />
      {loading ? <LinearProgress></LinearProgress> : ""}
      {error ? (
        <Alert className={classes.error} severity="error">
          {error.graphQLErrors.map(({ message }) => {
            return <span>{message}</span>
          })}
          {error.networkError
            ? "Sorry, we are having some issues fetching the news feed."
            : ""}
        </Alert>
      ) : (
        ""
      )}
      <ul className={classes.postList}>
        {data
          ? data.getFeed.map((post, index) => {
              return (
                <li key={post.id}>
                  <Post
                    id={post.id}
                    poster={post.user.firstName + " " + post.user.lastName}
                    post={post.post}
                    likesCount={post.likesCount}
                    isLiked={post.likedByUser}
                  />
                </li>
              )
            })
          : ""}
      </ul>
      <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFeedOffset(feedOffset + 1)}
      >
        Load more
      </Button>
    </Container>
  )
}

export default FeedPage
