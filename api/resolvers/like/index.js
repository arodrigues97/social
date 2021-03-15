import lodashPkg from "lodash"
const { merge } = lodashPkg
import likeResolver from "./likeResolver.js"
import likeMutation from "./likeMutation.js"

const likeResolvers = merge({}, likeResolver, likeMutation)

export default likeResolvers
