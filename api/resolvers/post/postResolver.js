import { getUser, getToken } from "../../utils/auth.js"
import { resolveUser } from "../resolvers.js"

const likes = async function (parent, args, context) {
  let likes = await context.prisma.postLike.findMany({
    where: { postId: parent.id },
  })
  return likes
}

const likesCount = async function (parent, args, context) {
  let likes = await context.prisma.postLike.findMany({
    where: { postId: parent.id },
  })
  return likes.length
}

const likedByUser = async function (parent, args, context) {
  let user = await getUser(context)
  let likes = await context.prisma.postLike.findMany({
    where: { userId: user.id, postId: parent.id },
  })
  let ok = likes.length >= 1 ? true : false
  return likes.length >= 1 ? true : false
}

export default {
  Post: {
    user: resolveUser,
    likes,
    likesCount,
    likedByUser,
  },
}
