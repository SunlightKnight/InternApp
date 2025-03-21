import { createContext, useCallback, useState } from "react"
import AppInterface from "./AppInterface"
import Loader from "../../components/Loader"

interface AppContextType {
  app: AppInterface
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children } : any) => {
  const [loading, setLoading] = useState(false)

  return <AppContext.Provider value={{
    app: {
      handleLoader: setLoading
    }
  }}>
    {children}
    <Loader loading={loading} />
  </AppContext.Provider>
}

export default AppProvider