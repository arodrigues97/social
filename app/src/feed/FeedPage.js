import {
  Button,
  Container,
  LinearProgress,
  makeStyles,
  Grid,
  Avatar,
  Box,
} from "@material-ui/core"
import { Skeleton } from "@material-ui/lab"
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
    marginTop: theme.spacing(2),
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
  const [getFeed, { loading, data: feedData }] = useLazyQuery(GET_FEED, {
    onCompleted({ getFeed }) {
      if (scrollRef != null) {
        scrollRef.current.scrollIntoView()
      }
    },
  })

  /**
   * The query hook to fetch the users data.
   */
  const { loading: loadingUserData, data: userData } = useQuery(GET_USER, {
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

  /**
   * The function is used to return a component of loaded posts.
   * @returns The loaded posts as a component.
   */
  function loadPosts() {
    return (
      <div>
        <ul className={classes.postList}>
          {feedData.getFeed.map((post, index) => {
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
          })}
        </ul>
        <div style={{ float: "left", clear: "both" }} ref={scrollRef}></div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFeedOffset(feedOffset + 1)}
        >
          Load more
        </Button>
      </div>
    )
  }

  return (
    <Container>
      <Grid container className={classes.root} spacing={3}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={4}>
          {!userData ? (
            <div>
              <Box margin={4}>
                <Skeleton variant="circle" width={40} height={40} />
                <Skeleton variant="rect" width={410} height={118} />
              </Box>
            </div>
          ) : (
            <CreatePost user={userData.getUser} />
          )}
          {!feedData ? (
            <div>
              <div>
                <Box margin={4}>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={410} height={200} />
                </Box>
                <Box margin={4}>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={410} height={200} />
                </Box>
                <Box margin={4}>
                  <Skeleton variant="circle" width={40} height={40} />
                  <Skeleton variant="rect" width={410} height={200} />
                </Box>
              </div>
            </div>
          ) : (
            loadPosts()
          )}
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  )
}

export default FeedPage
