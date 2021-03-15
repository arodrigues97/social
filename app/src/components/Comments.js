import Comment from "./Comment"
import { CardContent } from "@material-ui/core"

/**
 * Represents the list of comments displayed under a Post.
 * @param {*} props The props passed.
 * @returns The compomnent Comments.
 */
const Comments = (props) => {
  return (
    <CardContent>
      {props.comments.map((comment) => {
        return (
          <Comment
            comment={comment.comment}
            commenter={comment.user.firstName + " " + comment.user.lastName}
            likes={comment.likesCount}
          ></Comment>
        )
      })}
    </CardContent>
  )
}

export default Comments
