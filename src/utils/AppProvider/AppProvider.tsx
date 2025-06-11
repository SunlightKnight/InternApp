import { createContext, useState } from "react"
import AppInterface from "./AppInterface"
import Loader from "../../components/Main/Loader"
import { Pet, PetUser, User } from '../../assets/SharedTypes'

interface AppContextType {
  app: AppInterface
}

export const AppContext = createContext<AppContextType | null>(null)

const AppProvider = ({ children }: any) => {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState({ userName: '', password: '' })
  const [currentPetUser, setCurrentPetUser] = useState<PetUser | undefined>(undefined)
  const [cart, setCart] = useState(Array<Pet>)

  return <AppContext.Provider value={{
    app: {
      handleLoader: setLoading,
      setUser: setCurrentUser,
      setPetUser: setCurrentPetUser,
      setCart : setCart,
      user: currentUser,
      petUser: currentPetUser,
      cart : cart
    }
  }}>
    {children}
    <Loader loading={loading} />
  </AppContext.Provider>
}

export default AppProvider