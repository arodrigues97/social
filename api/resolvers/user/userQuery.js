import { getUser as getAuthUser } from "../../utils/auth.js"

const getUser = async function (parent, args, context) {
  return await getAuthUser(context)
}

export default {
  Query: {
    getUser,
  },
}
