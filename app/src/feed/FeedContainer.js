import { useQuery } from "@apollo/client"
import { Button, Grid, LinearProgress, makeStyles } from "@material-ui/core"
import { useContext, useState } from "react"
import CreatePost from "../components/post/CreatePost"
import PostList from "../components/post/PostList"
import userContext from "../user/userContext"
import GET_FEED from "./getFeedQuery"

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}))

const FeedContainer = () => {
  const classes = useStyles()
  const context = useContext(userContext)
  const [feedOffset, setFeedOffset] = useState(0)
  const { loading, data, fetchMore } = useQuery(GET_FEED, {
    variables: {
      offset: 0,
    },
  })

  const loadMoreFeed = () => {
    setFeedOffset(feedOffset + 1)
    fetchMore({ variables: { offset: feedOffset + 1 } })
  }

  const FeedContent = () => {
    return (
      <div>
        <PostList posts={data.getFeed}></PostList>
        <div style={{ float: "left", clear: "both" }}></div>
        <Button variant="contained" color="primary" onClick={loadMoreFeed}>
          Load more
        </Button>
      </div>
    )
  }

  return (
    <main>
      <Grid container className={classes.root} spacing={8}>
        <Grid item xs={12} md={4}>
          <CreatePost user={context.getUser} />
        </Grid>
        <Grid item xs={12} md={8} style={{ padding: "0" }}>
          {loading ? (
            <LinearProgress style={{ marginTop: "4rem" }} />
          ) : (
            <FeedContent />
          )}
        </Grid>
      </Grid>
    </main>
  )
}

export default FeedContainer
