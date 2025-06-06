export var currentUsername = ''

export function setUsername(username : string) {
    currentUsername = username
}

export function getUsername() {
    return currentUsername
}