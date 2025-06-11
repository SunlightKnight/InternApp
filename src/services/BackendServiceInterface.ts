import { Activity, Author, BookEntry, CoverPhoto, Order, Pet, PetUser, User } from "../assets/SharedTypes";

// BackendServiceProvider MUST implement all the functions defined inside its interface.
export default interface BackendServiceInterface {
  getUsers: () => Promise<Array<User>>
  getBooks: () => Promise<Array<BookEntry>>
  getAuthors: () => Promise<Array<Author>>
  getImages: () => Promise<Array<CoverPhoto>>
  getActivities: () => Promise<Array<Activity>>
  checkUser: (username : string) => Promise<PetUser>
  loginPetUser: (username : string, password : string) => Promise<String>
  createUser: (user : PetUser) => Promise<String>
  findPetsByStatus: (status : string) => Promise<Array<Pet>>
  logoutPetUser: () => Promise<String>
  placeOrder: (orderToBePlace : Order) => Promise<Order>
}