import { gql } from "@apollo/client"

/**
 * The graphql mutation to add a comment.
 */
const ADD_COMMENT = gql`
  mutation AddComment($comment: String!, $postId: Int!) {
    addComment(comment: $comment, postId: $postId) {
      id
      comment
      post {
        id
        post
      }
      user {
        id
        firstName
        lastName
      }
    }
  }
`

export default ADD_COMMENT
