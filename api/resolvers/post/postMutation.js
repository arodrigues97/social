import { getUser, getToken } from "../../utils/auth.js"
import { UserInputError } from "apollo-server"

const createPost = async function (parent, args, context) {
  let user = await getUser(context)
  let post = args.post
  //Determine max post length & include validation
  if (post.length < 1) {
    throw new UserInputError("A post must be a minimum of one character long.")
  }
  let postModel = await context.prisma.post.create({
    data: { post: post, userId: user.id },
  })
  return postModel
}

const likePost = async function (parent, args, context) {
  let user = await getUser(context)
  if (!user) {
    return
  }
  let post = await context.prisma.post.findUnique({
    where: { id: args.postId },
  })
  if (!post) {
    throw new ApolloError("Error: No post found for " + args.postId)
    return
  }
  let likes = await context.prisma.postLike.findMany({
    where: { postId: args.postId, userId: user.id },
  })

  if (likes.length > 0) {
    let like = likes[0]
    let deleteLike = await context.prisma.postLike.delete({
      where: { id: like.id },
    })
    return {
      like: like,
      liked: false,
    }
  }
  let like = await context.prisma.postLike.create({
    data: {
      postId: post.id,
      userId: user.id,
    },
  })
  return {
    like: like,
    liked: true,
  }
}

export default {
  Mutation: {
    createPost,
  },
}
