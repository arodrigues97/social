import { gql } from "@apollo/client"

/**
 * The register mutation
 */
const REGISTER = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $passwordRepeat: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      passwordRepeat: $passwordRepeat
    ) {
      token
      user {
        id
      }
    }
  }
`

export default REGISTER
