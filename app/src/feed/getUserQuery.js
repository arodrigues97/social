import { gql } from "@apollo/client"

const GET_USER = gql`
  query {
    getUser {
      id
      firstName
      lastName
    }
  }
`
export default GET_USER
