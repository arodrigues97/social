import lodashPkg from "lodash"
const { merge } = lodashPkg
import UserResolvers from "./user/index.js"
import CommentResolvers from "./comment/index.js"
import PostResolvers from "./post/index.js"
import LikeResolvers from "./like/index.js"

export const resolvers = merge(
  {},
  UserResolvers,
  CommentResolvers,
  PostResolvers,
  LikeResolvers
)

export async function resolveUser(parent, args, context) {
  let user = await context.prisma.user.findUnique({
    where: { id: parent.userId },
  })
  return user
}
