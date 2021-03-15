import { gql } from "@apollo/client"

/**
 * The graphql query to get comments.
 */
const GET_COMMENTS = gql`
  query GetComments($postId: Int!) {
    getComments(postId: $postId) {
      id
      comment
      post {
        id
      }
      user {
        id
        firstName
        lastName
      }
      likes {
        id
        user {
          id
        }
      }
      likesCount
    }
  }
`

export default GET_COMMENTS
