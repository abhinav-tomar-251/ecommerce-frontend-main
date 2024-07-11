export interface RegisterData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
    profilePic: string;
    subscribed_plan: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePic?: string;
  role: string;
  subscribed_plan: string;
  active_plan: boolean;
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

export interface ProductDetails {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string[];
}

export interface PaymentDetails {
  payment_method_type: string[];
  payment_status: string;
}

export interface ShippingOptions {
  shipping_rate: string;
  shipping_amount: number;
}

export interface Order {
  name: string;
  email: string;
  userId: string;
  receipt_url: string;
  createdAt: string;
  productDetails: ProductDetails[];
  paymentDetails: PaymentDetails;
  shipping_options: ShippingOptions[];
  totalAmount: number;
}

export interface AdminProductCardProps {
  data: {
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
  };
  fetchdata: () => void;
}

export interface ProductData {
  productName: string;
  brandName: string;
  category: string;
  productImage: string[];
  description: string;
  price: number;
  rating: number;
  sellingPrice: number;
}
