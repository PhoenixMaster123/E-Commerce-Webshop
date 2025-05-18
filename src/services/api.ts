// src/services/api.ts

import axios from 'axios';
import {
    Product,
    ProductsApiResponse,
    User,
    Cart,
    CartsApiResponse,
    RegisterUserPayload
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token
apiClient.interceptors.request.use(
    config => {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// Fetch a list of products (optionally by category)
export const getProducts = async (
    limit = 10,
    skip = 0,
    category?: string
): Promise<ProductsApiResponse> => {
    const params: { limit: number; skip: number; category?: string } = { limit, skip };
    if (category) params.category = category;
    const response = await apiClient.get<ProductsApiResponse>('/products', { params });
    return response.data;
};

// Fetch single product by ID
export const getProductById = async (id: number | string): Promise<Product> => {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
};

// Search products by query
export const searchProducts = async (
    query: string,
    limit = 10,
    skip = 0
): Promise<ProductsApiResponse> => {
    const response = await apiClient.get<ProductsApiResponse>('/products/search', {
        params: { q: query, limit, skip },
    });
    return response.data;
};

// Fetch all categories
export const getCategories = async (): Promise<string[]> => {
    const response = await apiClient.get<string[]>('/products/categories');
    return response.data;
};

// Authentication endpoints
export const login = async (
    username: string,
    password: string
): Promise<User> => {
    const response = await apiClient.post<User>('/auth/login', { username, password });
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }
    return response.data;
};

export const getMe = async (): Promise<User> => {
    try {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            logoutUser();
        }
        throw error;
    }
};

export const logoutUser = (): void => {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization'];
};

// Cart endpoints
export const getMyCart = async (): Promise<Cart> => {
    const response = await apiClient.get<Cart>('/cart');
    return response.data;
};

export const updateMyCart = async (
    products: { id: number; quantity: number }[]
): Promise<Cart> => {
    const response = await apiClient.patch<Cart>('/cart', { products });
    return response.data;
};

export const deleteMyCart = async (): Promise<Cart> => {
    const response = await apiClient.delete<Cart>('/cart');
    return response.data;
};

// Admin overview
export const getAllCarts = async (): Promise<CartsApiResponse> => {
    const response = await apiClient.get<CartsApiResponse>('/carts');
    return response.data;
};

// User registration
export const registerUser = async (
    data: RegisterUserPayload
): Promise<User> => {
    const response = await apiClient.post<User>('/users/add', data);
    return response.data;
};
