import { getUser } from "../../utils/auth.js"
import UserInputError from "apollo-server"

const toggleLike = async function (parent, args, context) {
  //Ensure user bound action
  let user = await getUser(context)

  let userId = user.id

  //The target id (either a postId or commentId)
  let targetId = args.targetId

  //If it is an action of liking a post or comment
  let likeType = args.likeType

  let isPost = likeType == "POST"

  //The table of the target
  let targetModelTable = isPost ? context.prisma.post : context.prisma.comment

  //The table of the table to store likes in
  let targetLikeModelTable = isPost
    ? context.prisma.postLike
    : context.prisma.commentLike

  //Search for the unique target
  let targetModel = await targetModelTable.findUnique({
    where: { id: targetId },
  })

  //Check if the target still exists
  if (!targetModel) {
    throw new ApolloError("Error: No target found to like for " + args.targetId)
  }
  //Has the target been liked?
  let likes
  if (isPost) {
    likes = await targetLikeModelTable.findMany({
      where: { postId: targetId, userId: userId },
    })
  } else {
    likes = await targetLikeModelTable.findMany({
      where: { commentId: targetId, userId: userId },
    })
  }
  //This target has already been like
  if (likes.length > 0) {
    let like = likes[0]
    let deleteLike = await targetLikeModelTable.delete({
      where: { id: like.id },
    })
    if (!deleteLike) {
      throw new ApolloError("Error: Was unable to delete like.")
    }
    return {
      like: like,
      liked: false,
    }
  }
  let like
  if (isPost) {
    like = await targetLikeModelTable.create({
      data: { postId: targetId, userId: userId },
    })
  } else {
    like = await targetLikeModelTable.create({
      data: { commentId: targetId, userId: userId },
    })
  }
  if (!like) {
    throw new ApolloError("Error: Was unable to create the like.")
  }
  return {
    like: like,
    liked: true,
  }
}

export default {
  Mutation: {
    toggleLike,
  },
}
