import { useQuery } from "@apollo/client"
import { LinearProgress } from "@material-ui/core"
import PostList from "../post/PostList"
import GET_PROFILE_POSTS from "./getProfilePosts"

const ProfilePosts = () => {
  const { data } = useQuery(GET_PROFILE_POSTS, {
    variables: {
      offset: 0,
    },
  })
  if (!data) {
    return <LinearProgress></LinearProgress>
  }
  return (
    <div>
      <PostList posts={data.getProfilePosts} />
    </div>
  )
}

export default ProfilePosts
