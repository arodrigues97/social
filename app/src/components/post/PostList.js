import { LinearProgress, makeStyles } from "@material-ui/core"
import Post from "./Post"

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
    listStyle: "none",
  },
}))

const PostList = (props) => {
  let classes = useStyles()
  let posts = props.posts
  return (
    <ul className={classes.root}>
      {posts.map((post) => {
        return (
          <li key={post.id}>
            <Post
              id={post.id}
              poster={post.user.firstName + " " + post.user.lastName}
              post={post.post}
              likesCount={post.likesCount}
              isLiked={post.likedByUser}
              commentCount={post.commentCount}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default PostList
