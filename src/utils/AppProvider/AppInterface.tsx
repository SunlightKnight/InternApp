import { Dispatch, SetStateAction } from "react";
import { Pet, PetUser, User } from '../../assets/SharedTypes'

// AppProvider MUST implement all the functions defined inside its interface.
export default interface AppInterface {
  handleLoader: Dispatch<SetStateAction<boolean>>
  setUser : Dispatch<SetStateAction<User>>
  setPetUser: Dispatch<SetStateAction<PetUser | undefined>>
  setCart: Dispatch<SetStateAction<Array<Pet>>>
  user : User
  petUser : PetUser | undefined
  cart: Array<Pet>
}