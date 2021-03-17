import { useLazyQuery } from "@apollo/client"
import {
  Card,
  CardActions,
  CardHeader,
  Avatar,
  CardContent,
  makeStyles,
  Box,
  Button,
  CardActionArea,
} from "@material-ui/core"
import { gql } from "graphql-tag"
import { useEffect, useState } from "react"
import AddComment from "./AddComment"
import GET_REPLIES from "./getRepliesQuery"

/**
 * Represents the styling of a Comment.
 */
const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}))

/**
 * Represents a comment under a Post.
 * @param {*} props The props passed.
 * @returns The component Comment.
 */
const Comment = (props) => {
  /**
   * The instance of the styles to use.
   */
  const classes = useStyles()

  /**
   * The repy toggle.
   */
  const [replyToggle, setReplyToggle] = useState(false)

  /**
   * The query hook used to retrieve the replies.
   */
  const [replyComments, { data }] = useLazyQuery(GET_REPLIES)

  /**
   * Loads the comment replies.
   */
  useEffect(() => {
    replyComments({ variables: { commentId: parseInt(props.id) } })
  }, [])

  /**
   * Handles the replies being toggled.
   */
  function handleReplyToggle() {
    setReplyToggle(!replyToggle)
  }

  /**
   * The styling to aplly for a reply.
   */
  let replyToStyle = {
    margin: "2rem",
  }

  return (
    <div className={classes.root}>
      <Card variant="outlined" style={props.replyTo ? replyToStyle : {}}>
        <CardHeader
          title={props.commenter}
          className={classes.cardHeader}
          avatar={
            <Avatar src="https://material-ui.com/static/images/avatar/1.jpg"></Avatar>
          }
        ></CardHeader>
        <CardContent>
          <Box component="span" fontWeight={500}>
            {props.commenter}
          </Box>
          <p>{props.comment}</p>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleReplyToggle}>
            Reply
          </Button>
          <Button size="small">Like ({props.likes})</Button>
        </CardActions>
        {replyToggle ? (
          <AddComment
            postId={props.postId}
            replyCommentId={props.id}
          ></AddComment>
        ) : (
          ""
        )}

        <div className="replies">
          {data && data.getReplies
            ? data.getReplies.map((reply) => {
                return (
                  <div>
                    <Comment
                      id={reply.id}
                      postId={reply.post.id}
                      commenter={
                        reply.user.firstName + " " + reply.user.lastName
                      }
                      comment={reply.comment}
                      likes={reply.likesCount}
                      replyTo={true}
                      replies={reply.replies}
                    ></Comment>
                  </div>
                )
              })
            : ""}
        </div>
      </Card>
    </div>
  )
}

export default Comment
