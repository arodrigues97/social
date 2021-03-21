import { gql } from "@apollo/client"

/**
 * The mutation used to create a post.
 */
const CREATE_POST = gql`
  mutation CreatePost($post: String!) {
    createPost(post: $post) {
      id
      post
      user {
        id
        firstName
        lastName
      }
      likes {
        id
      }
      likesCount
      likedByUser
      commentCount
    }
  }
`
export default CREATE_POST
