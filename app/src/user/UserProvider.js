import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import context from "./userContext"
import GET_USER from "./getUserQuery"

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null)
  const { error, loading, data } = useQuery(GET_USER, {
    onCompleted: () => {
      let user = data.getUser
      setUserData(user)
    },
  })

  const { Provider } = context
  if (loading) {
    return <span>Loading...</span>
  }
  if (!data) {
    return <span>Loading...</span>
  }
  return <Provider value={data}>{children}</Provider>
}

export default UserProvider
