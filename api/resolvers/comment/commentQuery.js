import { getUser, getToken } from "../../utils/auth.js"

async function getComments(parent, args, context) {
  let postId = args.postId
  let comments = await context.prisma.comment.findMany({
    where: { postId: postId },
  })
  return comments
}

export default {
  Query: {
    getComments: getComments,
  },
}
