import { getUser, getToken } from "../../utils/auth.js"
import { ApolloError, UserInputError } from "apollo-server"

async function addComment(parent, args, context) {
  let user = await getUser(context)
  let post = await context.prisma.post.findUnique({
    where: { id: args.postId },
  })
  if (!post) {
    throw new ApolloError("Error: No post found for " + args.postId)
  }
  let replyComment
  if (args.replyCommentId) {
    let replies = await context.prisma.comment.findMany({
      where: { postId: post.id, id: args.replyCommentId },
    })
    if (!replies) {
      throw new ApolloError(
        "E:rror: No comment found to reply to with id " + args.replyCommentId
      )
    }
    replyComment = replies[0]
  }
  let comment = args.comment
  if (comment.length < 1) {
    throw new UserInputError("A post must be a minimum of one character long.")
  }
  let commentModel = await context.prisma.comment.create({
    data: {
      comment: comment,
      postId: post.id,
      userId: user.id,
      commentId: replyComment != null ? replyComment.id : undefined,
    },
  })
  return commentModel
}

export default {
  Mutation: {
    addComment: addComment,
  },
}
