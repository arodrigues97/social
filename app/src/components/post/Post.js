import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core"
import Comments from "../comment/Comments"
import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import ThumbUpIcon from "@material-ui/icons/ThumbUp"
import ThumbDownIcon from "@material-ui/icons/ThumbDown"
import ChatBubbleIcon from "@material-ui/icons/ChatBubble"
import ADD_COMMENT from "../comment/addCommentMutation"
import GET_COMMENTS from "../comment/getCommentsQuery"
import { TOGGLE_LIKE, LikeType } from "./toggleLikeMutation"

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
  commentArea: {
    display: "block",
  },
  postComment: {
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
   * Represemts the comment value if responding to a post.
   */
  const [comment, setComment] = useState("")

  /**
   * Represents the mutation hook for executing an add comment mutation.
   */
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    onError({ error }) {},
  })

  /**
   * Represents the mutation hook for executing a post like.
   */
  const [toggleLike, { error: likePostError }] = useMutation(TOGGLE_LIKE, {
    onError({ likePostError }) {},
  })

  /**
   * Represents the query hook for retreiving comments.
   */
  const { loading, error: getCommentsError, data } = useQuery(GET_COMMENTS, {
    variables: {
      postId: parseInt(props.id),
    },
  })

  /**
   * The method used to handle the change of input for typing a comment.
   * @param {*} event The event executed.
   */
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  /**
   * The method used when the toggle button for comments is clicked.
   * @param {*} event The event executed.
   */
  const handleCommentsClick = (event) => {
    setCommentsToggle(!commentsToggle)
  }

  /**
   * The method used when the add comment button is cllicked.
   * @param {*} event
   */
  const handleAddComment = (event) => {
    addComment({
      variables: { comment: comment, postId: parseInt(props.id) },
      refetchQueries: {
        query: GET_COMMENTS,
        variables: { postId: parseInt(props.id) },
      },
    })
    setComment("")
    setCommentsToggle(true)
  }

  /**
   * The method used to handle when the like button is clicked.
   */
  const handleLikeClick = () => {
    toggleLike({
      variables: { targetId: parseInt(props.id), likeType: LikeType.POST },
    })
  }

  //TODO: clean up displaying of like post errors.
  if (likePostError) {
    return <span>{JSON.stringify(likePostError)}</span>
  }

  //TODO: clean up dispalying of post errors.
  if (error) {
    return <span>{JSON.stringify(error)}</span>
  }

  return (
    <Card className={classes.feed} variant="outlined" color="primary">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Posted by: {props.poster}
        </Typography>
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
      <CardActionArea>
        <CardActions>
          <Button size="small" onClick={handleCommentsClick}>
            <ChatBubbleIcon className={classes.icon} color="primary" /> (
            {data ? data.getComments.length : "0"})
          </Button>
          <Button size="small" onClick={handleLikeClick}>
            {props.isLiked ? (
              <ThumbDownIcon className={classes.icon} color="primary" />
            ) : (
              <ThumbUpIcon className={classes.icon} color="primary" />
            )}
            ({props.likesCount})
          </Button>
        </CardActions>
        <CardActions className={classes.commentArea}>
          <TextField
            fullWidth
            value={comment}
            label="Add a comment"
            name="comment"
            size="small"
            variant="outlined"
            onChange={handleCommentChange}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.postComment}
            onClick={handleAddComment}
          >
            Add Comment
          </Button>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}

export default Post
