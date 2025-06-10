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
