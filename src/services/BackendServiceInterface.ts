import { Activity, Author, BookEntry, CoverPhoto, User } from "../assets/SharedTypes";

// BackendServiceProvider MUST implement all the functions defined inside its interface.
export default interface BackendServiceInterface {
  getUsers: () => Promise<Array<User>>
  getBooks: () => Promise<Array<BookEntry>>
  getAuthors: () => Promise<Array<Author>>
  getImages: () => Promise<Array<CoverPhoto>>
  getActivities: () => Promise<Array<Activity>>
}