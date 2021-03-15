import { getUser, getToken } from "../../utils/auth.js"

const getFeed = async function (parent, args, context) {
  return await context.prisma.post.findMany({ orderBy: { id: "desc" } })
}

export default {
  Query: {
    getFeed,
  },
}
