import { Button, CardActions, TextField } from "@material-ui/core"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { makeStyles } from "@material-ui/core"
import ADD_COMMENT from "../comment/addCommentMutation"
import GET_COMMENTS from "../comment/getCommentsQuery"
import GET_REPLIES from "./getRepliesQuery"

/**
 * The styling of a post.
 */
const useStyles = makeStyles((theme) => ({
  postComment: {
    marginTop: theme.spacing(2),
  },
  commentArea: {
    display: "block",
  },
}))

/**
 * Represents the "Add Comment" area of the UI.
 * @param {*} props The props to pass.
 * @returns The AddComment component.
 */
const AddComment = (props) => {
  /**
   * Represents the instance of the classes for styling.
   */
  const classes = useStyles()

  /**
   * Represemts the comment value if responding to a post.
   */
  const [comment, setComment] = useState("")

  /**
   * Represents the mutation hook for executing an add comment mutation.
   */
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [
      { query: GET_COMMENTS, variables: { postId: parseInt(props.postId) } },
      /*
      //TODO: conditionally fetch this...
         {
        query: GET_REPLIES,
        variables: { commentId: parseInt(props.replyCommentId) },
      },*/
    ],
    onError({ error }) {
      console.log("Error=" + JSON.stringify(error))
    },
  })

  /**
   * The method used when the add comment button is cllicked.
   * @param {*} event
   */
  const handleAddComment = (event) => {
    addComment({
      variables: {
        comment: comment,
        postId: parseInt(props.postId),
        replyCommentId: parseInt(props.replyCommentId),
      },
    })
    setComment("")
  }

  /**
   * The method used to handle the change of input for typing a comment.
   * @param {*} event The event executed.
   */
  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  return (
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
  )
}

export default AddComment
