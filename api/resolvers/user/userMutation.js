import { getUser, getToken } from "../../utils/auth.js"
import { UserInputError } from "apollo-server"

/**
 * The email regex used for validation.
 */
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

/**
 * The method used to handle the registering of a new user.
 * @param {*} parent The previous resolver in the chain.
 * @param {*} args The arguments passed to the resolver.
 * @param {*} context The context object provided.
 * @returns The authentication token and user object.
 */
const register = async function (parent, args, context) {
  let { email, firstName, lastName, password } = args
  if (firstName.length < 1) {
    throw new UserInputError("You must provide a first name.")
  }
  if (lastName.length < 1) {
    throw new UserInputError("You must provide a last name.")
  }
  if (!ValidateEmail(email)) {
    throw new UserInputError("The email you provided is not a valid email.")
  }
  if (password.length < 6 || password.length > 32) {
    throw new UserInputError(
      "A password must be between 6 and 32 characters long."
    )
  }
  let user = await context.prisma.user.findUnique({
    where: { email: email },
  })
  if (user) {
    throw new UserInputError(
      "The email you provided has already been registered under another user."
    )
  }
  //TODO: complex passwords...
  user = await context.prisma.user.create({
    data: {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    },
  })
  const token = getToken(user.id)
  return { token, user }
}

/**
 * The method used to handle the registering of a new user.
 * @param {*} parent The previous resolver in the chain.
 * @param {*} args The arguments passed to the resolver.
 * @param {*} context The context object provided.
 * @returns The authentication token and user object.
 */
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

/**
 * Checks if the email given is valid.
 * @param {string} email The email to validate.
 * @returns True if valid.
 */
function ValidateEmail(email) {
  return EMAIL_REGEX.test(email)
}

export default {
  Mutation: {
    login,
    register,
  },
}
