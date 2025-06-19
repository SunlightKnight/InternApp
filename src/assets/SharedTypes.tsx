export type User = {
    id?: string,
    userName: string,
    password: string,
    biometricEnabled?: boolean
}

export type Profile = {
  id: string
  name: string
  email: string
  imageURL?: string // Directory dell'immagine di profilo
  title: string // Titolo aziendale
  quote?: string
  quoteAuthor?: string
  biography?: string
  cellNumber: string
}

export type PetUser = {
    id: number,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    userStatus: number
}

export type Pet = {
    id: number,
    category: {
      id: number,
      name: string
    },
    name: string,
    photoUrls: [
      string
    ],
    tags: [
      {
        id: number,
        name: string
      }
    ],
    status: string
}

export type Order = {
  id: number,
  petId: number,
  quantity: number,
  shipDate: string,
  status: string,
  complete: boolean,
  username?: string
}

export type BookEntry = {
    id: number,
    title: string,
    description: string,
    pageCount: number,
    excerpt: string,
    publishDate: string
}

export type Author = {
    id: string,
    idBook: string,
    firstName: string,
    lastName: string
}

export type CoverPhoto = {
    id: string,
    idBook: string,
    url: string,
}

export type Activity = {
    id: string,
    title: string,
    dueDate: string,
    completed: boolean
}
