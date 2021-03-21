import { gql } from "@apollo/client"

const GET_USER = gql`
  query {
    getUser {
      id
      firstName
      lastName
      profileImage
    }
  }
`

export default GET_USER
