export type User = {
    id?: number,
    userName: string,
    password: string,
    biometricEnabled?: boolean
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
  complete: boolean
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
    id: number,
    idBook: number,
    firstName: string,
    lastName: string
}

export type CoverPhoto = {
    id: number,
    idBook: number,
    url: string,
}

export type Activity = {
    id: 0,
    title: string,
    dueDate: string,
    completed: boolean
}
