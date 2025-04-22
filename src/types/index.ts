import './index.css';
import './ProductListPage.css';


export interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand?: string; // Optional
    sku: string;
    weight?: number;
    dimensions?: {
        width: number;
        height: number;
        depth: number;
    };
    warrantyInformation?: string;
    shippingInformation?: string;
    availabilityStatus?: string;
    reviews?: Review[];
    returnPolicy?: string;
    minimumOrderQuantity?: number;
    meta?: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    };
    images?: string[];
    thumbnail?: string;
}

export interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}


export interface ProductsApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
    filter?: { category: string }; // Optional, wenn gefiltert wird
}


export interface User {
    id: number;
    username: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    gender?: string;
    image?: string;
    role?: string;
    // more when necessary
    token?: string;
}


export interface CartProductDetail {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail?: string;
}

// Für die /cart API Antwort
export interface Cart {
    id: string | number; //normal number, but see in progress
    userId: number;
    products: CartProductDetail[];
    total: number;
    discountedTotal: number;
    totalProducts: number;
    totalQuantity: number;
    isDeleted?: boolean;
    deletedOn?: string;
}


export interface CartsApiResponse {
    carts: Cart[];
    total: number;
    skip: number;
    limit: number;
}

export interface ApiError {
    message: string;
}

export interface RegisterUserPayload {
    username: string;
    password: string;
    email?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
}