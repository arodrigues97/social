import { resolveUser } from "../resolvers.js"
import { getUser, getToken } from "../../utils/auth.js"

async function resolvePost(parent, args, context) {
  let post = await context.prisma.post.findUnique({
    where: { id: parent.postId },
  })
  return post
}

async function resolveLikes(parent, args, context) {
  let likes = await context.prisma.commentLike.findMany({
    where: { commentId: parent.id },
  })
  return likes
}

async function resolveLikesCount(parent, args, context) {
  let likes = await context.prisma.commentLike.findMany({
    where: { commentId: parent.id },
  })
  return likes.length
}

async function resolveReplies(parent, args, context) {
  let replies = await context.prisma.comment.findMany({
    where: { commentId: parent.id },
  })
  return replies
}

export default {
  Comment: {
    user: resolveUser,
    post: resolvePost,
    likes: resolveLikes,
    likesCount: resolveLikesCount,
  },
}
