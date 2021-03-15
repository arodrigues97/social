import postMutation from "./postMutation.js"
import postQuery from "./postQuery.js"
import postResolver from "./postResolver.js"
import lodashPkg from "lodash"
const { merge } = lodashPkg

const postResolvers = merge({}, postMutation, postQuery, postResolver)

export default postResolvers
