import { AlertTriangle, DollarSign, Package, TrendingUp, Plus, Search } from "lucide-react";
import {useState, useEffect, useContext} from 'react';
import CategoryDistributionChart from "../../Components/Admin_Components/charts/CategoryDistributionChart";
import SalesTrendChart from "../../Components/Admin_Components/charts/SalesTrendChart";
import Header from "../../Components/Admin_Components/Header";
import StatCard from "../../Components/Admin_Components/StatCard";
import ProductsTable from "../../Components/Admin_Components/tables/ProductsTable";
import { motion, AnimatePresence } from "framer-motion";
import AddProductForm from "../../Components/Admin_Components/form-functionalities/AddProductForm.tsx";
import EditProductForm from "../../Components/Admin_Components/form-functionalities/EditProductForm.tsx";
import {ThemeContext} from "../../contexts/ThemeContext.tsx";

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
}

const ProductsPage = () => {
    const { isDarkMode } = useContext(ThemeContext);

    const pageBgClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900';

    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [showEditProductForm, setShowEditProductForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [isAddingProduct, setIsAddingProduct] = useState(false);
    const [isUpdatingProduct, setIsUpdatingProduct] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingProducts(true);
            await new Promise(resolve => setTimeout(resolve, 1000));
            setProducts([
                { id: '1', name: 'Wireless Mouse', category: 'Electronics', price: 25.99, stock: 150, description: 'Ergonomic wireless mouse with long battery life.' },
                { id: '2', name: 'Mechanical Keyboard', category: 'Electronics', price: 79.99, stock: 75, description: 'RGB mechanical keyboard with tactile switches.' },
                { id: '3', name: 'USB-C Hub', category: 'Accessories', price: 35.00, stock: 200, description: '7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader.' },
                { id: '4', name: 'Gaming Headset', category: 'Electronics', price: 59.99, stock: 100, description: 'Comfortable gaming headset with surround sound.' },
                { id: '5', name: 'Monitor Stand', category: 'Furniture', price: 45.00, stock: 80, description: 'Adjustable monitor stand with storage space.' },
                { id: '6', name: 'External SSD 1TB', category: 'Storage', price: 120.00, stock: 60, description: 'Portable external SSD for fast data transfer.' },
                { id: '7', name: 'Webcam 1080p', category: 'Electronics', price: 49.99, stock: 120, description: 'Full HD webcam for video conferencing.' },
                { id: '8', name: 'Smartwatch', category: 'Wearables', price: 199.99, stock: 40, description: 'Fitness tracker and smartwatch with heart rate monitor.' },
                { id: '9', name: 'Noise-Cancelling Headphones', category: 'Audio', price: 179.99, stock: 90, description: 'Over-ear headphones with premium noise cancellation.' },
                { id: '10', name: 'Desk Chair', category: 'Furniture', price: 250.00, stock: 30, description: 'Ergonomic office chair with lumbar support.' },
                { id: '11', name: 'Portable Charger', category: 'Accessories', price: 29.99, stock: 250, description: 'High-capacity power bank for on-the-go charging.' },
                { id: '12', name: 'Graphics Tablet', category: 'Art & Design', price: 89.99, stock: 50, description: 'Digital drawing tablet for artists and designers.' },
                { id: '13', name: 'Ring Light', category: 'Photography', price: 39.99, stock: 110, description: 'LED ring light for perfect selfies and videos.' },
                { id: '14', name: 'Bluetooth Speaker', category: 'Audio', price: 65.00, stock: 95, description: 'Compact and powerful Bluetooth speaker with rich bass.' },
                { id: '15', name: 'Smart Plug', category: 'Smart Home', price: 15.00, stock: 300, description: 'Control your appliances remotely with this smart plug.' },
                { id: '16', name: 'Drone', category: 'Electronics', price: 399.00, stock: 20, description: 'Foldable drone with 4K camera and 30 min flight time.' },
                { id: '17', name: 'Robot Vacuum', category: 'Smart Home', price: 249.00, stock: 45, description: 'Self-emptying robot vacuum cleaner with smart mapping.' },
                { id: '18', name: 'Electric Kettle', category: 'Kitchen', price: 40.00, stock: 180, description: 'Fast boiling electric kettle with temperature control.' },
            ]);
            setIsLoadingProducts(false);
        };
        fetchProducts();
    }, []);

    const handleAddProduct = async (newProductData: Omit<Product, 'id'>) => {
        setIsAddingProduct(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newProduct: Product = {
            id: Date.now().toString(),
            ...newProductData,
        };
        setProducts((prevProducts) => [...prevProducts, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
        setIsAddingProduct(false);
        setShowAddProductForm(false);
    };

    const handleUpdateProduct = async (id: string, updatedData: Partial<Product>) => {
        setIsUpdatingProduct(true);
        console.log(`Sending update request for product ${id}:`, updatedData);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, ...updatedData } : product
            ).sort((a, b) => a.name.localeCompare(b.name))
        );
        setIsUpdatingProduct(false);
        setShowEditProductForm(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = (id: string) => {
        if (window.confirm(`Are you sure you want to delete product ${products.find(p => p.id === id)?.name}?`)) {
            console.log(`Deleting product with ID: ${id}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
            alert(`Product ${products.find(p => p.id === id)?.name} deleted successfully.`);
        }
    };

    const openEditForm = (product: Product) => {
        setSelectedProduct(product);
        setShowEditProductForm(true);
    };

    const totalProducts = products.length;
    const topSelling = 89;
    const lowStock = products.filter(p => p.stock < 50).length;
    const totalRevenue = products.reduce((sum, p) => sum + p.price * p.stock, 0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    return (
        <div className={`flex-1 overflow-auto relative z-10 ${pageBgClass}`}>
            <Header title='Products' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS are now first */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Products' icon={Package} value={totalProducts} color='#6366F1' />
                    <StatCard name='Top Selling' icon={TrendingUp} value={topSelling} color='#10B981' />
                    <StatCard name='Low Stock' icon={AlertTriangle} value={lowStock} color='#F59E0B' />
                    <StatCard name='Total Revenue' icon={DollarSign} value={totalRevenue} color='#EF4444' />
                </motion.div>

                {/* Search Bar and Add Product Button are now HERE, aligned right */}
                <div className="flex justify-end items-center mb-6"> {/* Changed to justify-end */}
                    <div className={`relative flex items-center mr-4
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Search className="absolute left-3" size={18} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-10 pr-4 py-2 rounded-md border
                                ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
                                focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            disabled={isLoadingProducts || isAddingProduct || isUpdatingProduct}
                        />
                    </div>
                    <motion.button
                        onClick={() => setShowAddProductForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isAddingProduct || isLoadingProducts || isUpdatingProduct}
                    >
                        <Plus className="mr-2" size={18} />
                        Add New Product
                    </motion.button>
                </div>

                <ProductsTable
                    products={products}
                    isLoading={isLoadingProducts}
                    searchQuery={searchQuery}
                    onUpdateProduct={openEditForm}
                    onDeleteProduct={handleDeleteProduct}
                />

                {/* CHARTS */}
                <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                    <SalesTrendChart />
                    <CategoryDistributionChart />
                </div>
            </main>

            {/* Modals remain at the end */}
            <AnimatePresence>
                {showAddProductForm && (
                    <AddProductForm
                        onClose={() => setShowAddProductForm(false)}
                        onAddProduct={handleAddProduct}
                        isAdding={isAddingProduct}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showEditProductForm && selectedProduct && (
                    <EditProductForm
                        product={selectedProduct}
                        onClose={() => {setShowEditProductForm(false); setSelectedProduct(null);}}
                        onUpdateProduct={handleUpdateProduct}
                        isUpdating={isUpdatingProduct}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
export default ProductsPage;