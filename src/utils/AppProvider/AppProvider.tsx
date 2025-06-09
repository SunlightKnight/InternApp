import { createContext, useState } from "react"
import AppInterface from "./AppInterface"
import Loader from "../../components/Loader"
import { User } from '../../assets/SharedTypes'

interface AppContextType {
  app: AppInterface
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children } : any) => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({userName: '', password: ''})

  return <AppContext.Provider value={{
    app: {
      handleLoader: setLoading,
      setUser : setCurrentUser,
      user : currentUser
    }
  }}>
    {children}
    <Loader loading={loading} />
  </AppContext.Provider>
}

export default AppProvider