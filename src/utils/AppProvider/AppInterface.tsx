import { Dispatch, SetStateAction } from "react";
import { User } from '../../assets/SharedTypes'

// AppProvider MUST implement all the functions defined inside its interface.
export default interface AppInterface {
  handleLoader: Dispatch<SetStateAction<boolean>>
  setUser : Dispatch<SetStateAction<User>>
  user : User
}