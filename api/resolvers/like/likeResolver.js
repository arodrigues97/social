import { resolvers, resolveUser } from "../resolvers.js"

export default {
  Like: {
    user: resolveUser,
    likeType: function (parent, args, context) {
      if (parent.commentId) {
        return "COMMENT"
      }
      return "POST"
    },
  },
}
