const APP_SECRET = "98381238129390943804w8d"
import { AuthenticationError } from "apollo-server-errors"
import pkg from "jsonwebtoken"
const { sign, verify } = pkg
const DEV_MODE = true

function getToken(userId) {
  return sign({ userId: userId }, APP_SECRET)
}

async function getUser(context) {
  if (DEV_MODE) {
    let user = await context.prisma.user.findUnique({ where: { id: 1 } })
    return user
  }
  const Authorization = context.req.get("Authorization")
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "")
    const { userId } = verify(token, APP_SECRET)
    let user = await context.prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      throw new AuthenticationError("Access denied, request not authenticated.")
    }
    return user
  }
  throw new AuthenticationError("Access denied, request not authenticated.")
}

export { getUser, getToken }
