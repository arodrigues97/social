import { gql } from "@apollo/client"

const GET_REPLIES = gql`
  query GetReplies($commentId: Int!) {
    getReplies(commentId: $commentId) {
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
export default GET_REPLIES
