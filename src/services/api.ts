
import axios from 'axios';
import { Product, ProductsApiResponse, User, Cart, CartsApiResponse , RegisterUserPayload} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor, to add the token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token && config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export const getProducts = async (limit: number = 10, skip: number = 0, category?: string): Promise<ProductsApiResponse> => {
    const params: { limit: number; skip: number; category?: string } = { limit, skip };
    if (category) {
        params.category = category;
    }
    try {
        const response = await apiClient.get<ProductsApiResponse>('/products', { params });
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const getProductById = async (id: number | string): Promise<Product> => {
    try {
        const response = await apiClient.get<Product>(`/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        throw error;
    }
};

export const searchProducts = async (query: string, limit: number = 10, skip: number = 0): Promise<ProductsApiResponse> => {
    try {
        const response = await apiClient.get<ProductsApiResponse>('/products/search', {
            params: { q: query, limit, skip },
        });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error);
        throw error;
    }
};




export const login = async (username: string, password: string): Promise<User> => {
    try {

        const response = await apiClient.post<User>('/auth/login', { username, password });
        // Save Token in LocalStorage
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        }
        throw new Error('An unknown error occurred during login.');
    }
};

export const getMe = async (): Promise<User> => {
    try {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    } catch (error) {
        console.error("Error fetching current user:", error);
        //  401 Unauthorized
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            logoutUser();
        }
        throw error;
    }
};

export const logoutUser = (): void => {
    localStorage.removeItem('authToken');
    // remove Auth-Header from axios
    delete apiClient.defaults.headers.common['Authorization'];
    console.log("User logged out, token removed.");
};


// --- Warenkorb-Endpunkte ---

export const getMyCart = async (): Promise<Cart> => {
    try {

        const response = await apiClient.get<Cart>('/cart');
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.warn("Cart not found (404), returning empty structure.");
        }
        throw error;
    }
};


export const updateMyCart = async (products: { id: number, quantity: number }[]): Promise<Cart> => {
    try {
        const response = await apiClient.patch<Cart>('/cart', { products });
        return response.data;
    } catch (error) {
        console.error("Error updating cart:", error);
        throw error;
    }
};


export const deleteMyCart = async (): Promise<Cart> => {
    try {

        const response = await apiClient.delete<Cart>('/cart');
        return response.data;
    } catch (error) {
        console.error("Error deleting cart:", error);
        throw error;
    }
};

// --- Admin/Übersicht (Beispiel) --- Noch add Products hinzufügen
export const getAllCarts = async (): Promise<CartsApiResponse> => {
    try {

        const response = await apiClient.get<CartsApiResponse>('/carts');
        return response.data;
    } catch (error) {
        console.error("Error fetching all carts:", error);
        throw error;
    }
};



export const registerUser = async (
    data: RegisterUserPayload
): Promise<User> => {
    try {
        const response = await apiClient.post<User>('/users/add', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);

        if (axios.isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message || 'Registrierung fehlgeschlagen.');
        }
        throw error;
    }
};