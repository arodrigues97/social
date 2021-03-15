import { gql } from "@apollo/client"

/**
 * The type of like to toggle
 */
export const LikeType = {
  POST: "POST",
  COMMENT: "COMMENT",
}

/**
 * The graphql mutation to like a post.
 */
export const TOGGLE_LIKE = gql`
  mutation toggleLike($targetId: Int!, $likeType: LikeType!) {
    toggleLike(targetId: $targetId, likeType: $likeType) {
      like {
        id
        user {
          id
          firstName
        }
        likeType
      }
      liked
    }
  }
`
