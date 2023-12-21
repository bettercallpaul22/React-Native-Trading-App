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

export interface Image{
    _id:number;
    image:string;
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
    images:Image[],
}

export interface SingleProductType{
    product:Product;
    product_owner:User
}
export interface UserProducts{
    product:Product[]
}


export interface Offer{
    _id:string;
    type:string;
    offered:string;
    product_condition:string;
    product_value:string;
    product_name:string;
    price_offered:string;
    customer:User;
    product:Product;
    success:boolean;
    images:Image[];
}


export type User = {
    _id: string,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string,
    avatar: string,
    city: string,
    state: string,
    country: string,
    credit: number,
    bio: string,
    gender: string,
    verified: boolean,
    product:Product,
}