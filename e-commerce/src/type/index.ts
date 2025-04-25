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
    category:string,
    price : string,
    quantity : string,
    images : File[]
}
export interface allProductTypes {
    id: number,
    name : string,
    description : string,
    category:string,
    price : string,
    quantity : string,
    images : string[]
}
export interface addtocart {
    productId : number,
    quantity : number,
   
}

export interface cartdataTypes {
    id: number,
    productId : number
    name : string,
    price : string,
    subtotal : number,
    image : string,
    quantity : number,
}