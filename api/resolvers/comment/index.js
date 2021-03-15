import commentMutation from "./commentMutation.js"
import commentQuery from "./commentQuery.js"
import commentResolver from "./commentResolver.js"
import lodashPkg from "lodash"
const { merge } = lodashPkg

const commentResolvers = merge(
  {},
  commentMutation,
  commentQuery,
  commentResolver
)

export default commentResolvers
