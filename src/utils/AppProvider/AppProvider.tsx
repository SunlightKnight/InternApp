import { createContext, useState } from "react"
import AppInterface from "./AppInterface"
import Loader from "../../components/Main/Loader"
import { PetUser, User } from '../../assets/SharedTypes'

interface AppContextType {
  app: AppInterface
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({ userName: '', password: '' })
  const [currentPetUser, setCurrentPetUser] = useState<PetUser | undefined>(undefined)

  return <AppContext.Provider value={{
    app: {
      handleLoader: setLoading,
      setUser: setCurrentUser,
      setPetUser: setCurrentPetUser,
      user: currentUser,
      petUser: currentPetUser
    }
  }}>
    {children}
    <Loader loading={loading} />
  </AppContext.Provider>
}

export default AppProvider