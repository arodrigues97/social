import userMutation from "./userMutation.js"
import userQuery from "./userQuery.js"
import userResolver from "./userResolver.js"
import lodashPkg from "lodash"
const { merge } = lodashPkg

const userResolvers = merge({}, userMutation, userQuery, userResolver)

export default userResolvers
