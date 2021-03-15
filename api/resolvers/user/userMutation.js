import { getUser, getToken } from "../../utils/auth.js"

const login = async function (parent, args, context) {
  let email = args.email
  let password = args.password
  const validationErrors = {}
  if (email.length == 0) {
    throw new UserInputError("You must enter an email.")
  }
  if (password.length == 0) {
    throw new UserInputError("You must enter a password.")
  }
  let user = await context.prisma.user.findUnique({
    where: { email: email },
  })
  if (!user) {
    throw new UserInputError(
      "We don't have any user registered with that email."
    )
  }
  if (password != user.password) {
    throw new UserInputError("That password doesn't match our records.")
  }
  const token = getToken(user.id)
  return { token, user }
}

const register = async function (parent, args, context) {
  let user = await context.prisma.user.create({
    data: {
      email: args.email,
      firstName: args.firstName,
      lastName: args.lastName,
      password: args.password,
    },
  })
  const token = getToken(user.id)
  return { token, user }
}

export default {
  Mutation: {
    login,
    register,
  },
}
