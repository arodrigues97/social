import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from "@material-ui/core"
import Comments from "../comment/Comments"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { Favorite, FavoriteBorder } from "@material-ui/icons/"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import GET_COMMENTS from "../comment/getCommentsQuery"
import GET_FEED from "../../feed/getFeedQuery"
import { TOGGLE_LIKE, LikeType } from "./toggleLikeMutation"
import AddComment from "../comment/AddComment"

/**
 * The styling of a post.
 */
const useStyles = makeStyles((theme) => ({
  feed: {
    margin: "auto",
    marginTop: theme.spacing(4),
  },
  title: {
    fontSize: 14,
    marginTop: theme.spacing(2),
  },
  icon: {
    margin: theme.spacing(1),
  },
}))

/**
 * Represents a Post on the user interface.
 * @param {*} props The props passed into the component.
 * @returns The component Post.
 */
const Post = (props) => {
  /**
   * Represents the instance of the classes for styling.
   */
  const classes = useStyles()

  /**
   * Represents if the comment area is toggled.
   */
  const [commentsToggle, setCommentsToggle] = useState(false)

  /**
   * Represents the mutation hook for executing a post like.
   */
  const [toggleLike] = useMutation(TOGGLE_LIKE, {
    refetchQueries: [{ query: GET_FEED, variables: { offset: 0 } }],
    onError({ likePostError }) {},
  })

  /**
   * Represents the query hook for retreiving comments.
   */
  const { data } = useQuery(GET_COMMENTS, {
    variables: {
      postId: parseInt(props.id),
    },
    onError({ error }) {},
  })

  /**
   * The method used when the toggle button for comments is clicked.
   * @param {*} event The event executed.
   */
  const handleCommentsClick = (event) => {
    setCommentsToggle(!commentsToggle)
  }

  /**
   * The method used to handle when the like button is clicked.
   */
  const handleLikeClick = () => {
    toggleLike({
      variables: { targetId: parseInt(props.id), likeType: LikeType.POST },
    })
  }

  return (
    <Card className={classes.feed} variant="outlined" color="primary">
      <CardContent>
        <CardHeader
          title={props.poster}
          className={classes.cardHeader}
          avatar={
            <Avatar src="https://avatars.githubusercontent.com/u/36482887?s=460&u=4babd11bd036d847b91f98c500e652c2ce55e329&v=4"></Avatar>
          }
        ></CardHeader>
        <Typography component="h3" variant="h6">
          {props.post}
        </Typography>
      </CardContent>

      {commentsToggle &&
      data &&
      data.getComments &&
      data.getComments.length > 0 ? (
        <Comments comments={data.getComments} postId={props.id}></Comments>
      ) : (
        ""
      )}

      <CardActions>
        <Button size="small" onClick={handleCommentsClick}>
          <ChatBubbleIcon className={classes.icon} color="primary" /> (
          {props.commentCount})
        </Button>
        <Button size="small" onClick={handleLikeClick}>
          {props.isLiked ? (
            <Favorite className={classes.icon} color="primary" />
          ) : (
            <FavoriteBorder className={classes.icon} color="primary" />
          )}
          ({props.likesCount})
        </Button>
      </CardActions>
      <AddComment postId={props.id}></AddComment>
    </Card>
  )
}

export default Post
