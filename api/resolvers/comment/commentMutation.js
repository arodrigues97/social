import { getUser, getToken } from "../../utils/auth.js"
import { ApolloError, UserInputError } from "apollo-server"

async function addComment(parent, args, context) {
  let user = await getUser(context)
  if (!user) {
    return
  }
  let post = await context.prisma.post.findUnique({
    where: { id: args.postId },
  })
  if (!post) {
    throw new ApolloError("Error: No post found for " + args.postId)
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
    },
  })
  return commentModel
}

export default {
  Mutation: {
    addComment: addComment,
  },
}
