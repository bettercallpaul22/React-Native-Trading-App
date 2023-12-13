export interface AuthResponse{
    _id: string,
    user:User;
    success: true;
    token:string;

} 

export interface LoginValues {
    email: string;
    password: string;
}


export interface RegisterValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    comfirm_password: string;
}

export type AppStackParamList = {
    Home:undefined;
    Login:undefined;
    Register:undefined;
}


export interface Product{
    _id: string;
    owner_id: string;
    product_name: string;
    product_price:number;
    product_category: string;
    product_condition: string;
    product_desc: string;
    deal_type: string;
    images:string[],
}

export interface SingleProductType{
    product:Product;
    product_owner:User
}
export interface UserProducts{
    product:Product[]
}


export type User = {
    _id: String,
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
    avatar: String,
    city: String,
    state: String,
    country: String,
    mobile_number: String,
    product:Product,
}