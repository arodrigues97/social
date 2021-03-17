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
            id={comment.id}
            postId={comment.post.id}
            comment={comment.comment}
            commenter={comment.user.firstName + " " + comment.user.lastName}
            likes={comment.likesCount}
            replies={comment.replies}
          ></Comment>
        )
      })}
    </CardContent>
  )
}

export default Comments
