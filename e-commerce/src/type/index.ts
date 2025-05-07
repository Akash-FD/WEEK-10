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

export interface orderDataTypes {
    producyt_id: number,
    quantity : number,
}

export interface orderDataObj{
    products : orderDataTypes[],
    address : string,
    city : string,
    pincode: number,
}

export interface AllOrderData{
    order_id:number,
    status:string,
    buyer:{
        id:number,
        name:string
    },
    products:{
        product_id:number,
        name:string,    
        quantity:number
    }[]
}

export interface Status{
    status :string
}

export interface emailObjType {
    email : string, 
 }

export interface filterTypes {
    sortBy: string,
    order: string,
    minPrice: string,
    maxPrice: string,
    category: string,
    search: string,
}

export interface productDataTypes{
    id:string,
    name:string,
    price:number,
    images:string[]
}

export interface ResetPasswordTpyes{
    newPassword:string,
    confirmPassword:string
}

