import { gql } from "@apollo/client"

const GET_PROFILE_POSTS = gql`
  query GetProfilePosts($offset: Int!) {
    getProfilePosts(offset: $offset) {
      id
      post
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
      likedByUser
      commentCount
    }
  }
`

export default GET_PROFILE_POSTS
