import {
  Button,
  Container,
  LinearProgress,
  makeStyles,
  Grid,
} from "@material-ui/core"
import Post from "../components/post/Post"
import CreatePost from "../components/post/CreatePost"
import Alert from "@material-ui/lab/Alert"
import { useLazyQuery, useQuery } from "@apollo/client"
import GET_FEED from "./getFeedQuery"
import GET_USER from "./getUserQuery"
import { useEffect, useRef, useState } from "react"

/**
 * Creates the styling of the feed page.
 */
const useStyles = makeStyles((theme) => ({
  root: {
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
   * The query hook to fetch the users data.
   */
  const { data: getUserData } = useQuery(GET_USER, {
    onError({ error }) {},
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

  if (!getUserData) {
    return <span>Loading...</span>
  }
  return (
    <Container>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          <CreatePost user={getUserData.getUser} />
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
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  )
}

export default FeedPage
