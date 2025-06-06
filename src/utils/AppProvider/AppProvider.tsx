import { createContext, useState } from "react"
import AppInterface from "./AppInterface"
import Loader from "../../components/Loader"

interface AppContextType {
  app: AppInterface
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children } : any) => {
  const [loading, setLoading] = useState(false)
  const [currentUsername, setCurrentUsername] = useState('')

  return <AppContext.Provider value={{
    app: {
      handleLoader: setLoading,
      setUsername : setCurrentUsername,
      username : currentUsername
    }
  }}>
    {children}
    <Loader loading={loading} />
  </AppContext.Provider>
}

export default AppProvider