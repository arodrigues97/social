import { gql } from "@apollo/client"

/**
 * Represents the query to fetch for the feed.
 */
const GET_FEED = gql`
  query GetFeed($offset: Int!) {
    getFeed(offset: $offset) {
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
    }
  }
`

export default GET_FEED
