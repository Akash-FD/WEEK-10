export interface RegisterTypes {
    name : string,
    email : string,
    password : string,
    role : "Buyer" | "Seller"
}

export interface LoginTypes {
    email : string,
    password : string
}

export interface User {
    id : number,
    name : string,
    email : string,
    role : "Buyer" | "Seller"
}
