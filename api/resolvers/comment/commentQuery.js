import { getUser, getToken } from "../../utils/auth.js"

async function getComments(parent, args, context) {
  let postId = args.postId
  let comments = await context.prisma.comment.findMany({
    where: { postId: postId, commentId: null },
  })
  return comments
}

async function getReplies(parent, args, context) {
  if (!args.commentId) {
    return
  }
  let commentId = args.commentId
  let comments = await context.prisma.comment.findMany({
    where: { commentId: commentId },
  })
  return comments
}

export default {
  Query: {
    getComments,
    getReplies,
  },
}
