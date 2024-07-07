
export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    profilePic?: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Product {
    _id: string;
    productName: string;
    brandName: string;
    category: string;
    productImage: string[];
    description: string;
    price: number;
    rating: number;
    sellingPrice: number;
    createdAt: Date;
    updatedAt: Date;
}
  