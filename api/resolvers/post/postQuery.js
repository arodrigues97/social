import { getUser, getToken } from "../../utils/auth.js"

const getFeed = async function (parent, args, context) {
  return await context.prisma.post.findMany({
    skip: 0,
    take: 5 + args.offset * 5,
    orderBy: { id: "desc" },
  })
}

const getProfilePosts = async function (parent, args, context) {
  let user = await getUser(context)
  return await context.prisma.post.findMany({
    skip: 0,
    take: 5 + args.offset * 5,
    where: {
      userId: user.id,
    },
    orderBy: { id: "desc" },
  })
}

export default {
  Query: {
    getFeed,
    getProfilePosts,
  },
}
