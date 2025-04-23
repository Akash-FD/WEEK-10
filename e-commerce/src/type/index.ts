export interface RegisterTypes {
    name : string,
    email : string,
    password : string,
    role : "Buyer" | "Seller | Admin"
}

export interface LoginTypes {
    email : string,
    password : string
}

export interface User {
    id : number,
    name : string,
    email : string,
    role : "Buyer" | "Seller | Admin"
}

export interface adminForm {
    name : string,
    description : string,
    price : string,
    quantity : string,
    images : File[]
}
export interface allProductTypes {
    id: number,
    name : string,
    description : string,
    price : string,
    quantity : string,
    images : string[]
}
