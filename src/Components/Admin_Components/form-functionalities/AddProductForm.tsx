import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AddProductFormProps {
    onClose: () => void;
    onAddProduct: (newProductData: { name: string; category: string; price: number; stock: number; description: string; }) => void;
    isAdding: boolean;
}

const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onAddProduct, isAdding }) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const [productName, setProductName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!productName || !category || !price || !stock || !description) {
            setError('All fields are required.');
            return;
        }
        if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
            setError('Price must be a positive number.');
            return;
        }
        if (isNaN(parseInt(stock)) || parseInt(stock) < 0) {
            setError('Stock must be a non-negative integer.');
            return;
        }

        onAddProduct({
            name: productName,
            category: category,
            price: parseFloat(price),
            stock: parseInt(stock),
            description: description,
        });
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className={`relative w-full max-w-2xl rounded-lg shadow-xl p-6 sm:p-8
          ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
            >
                <button
                    onClick={onClose}
                    className={`absolute top-4 right-4 text-gray-500 hover:text-gray-700
            ${isDarkTheme ? 'hover:text-gray-300' : ''}`}
                    disabled={isAdding}
                >
                    <X size={24} />
                </button>
                <h2 className={`text-2xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Add New Product</h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="productName" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Product Name</label>
                        <input
                            type="text" id="productName" value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className={`w-full p-2 border rounded-md shadow-sm
                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            disabled={isAdding}
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Category</label>
                        <input
                            type="text" id="category" value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className={`w-full p-2 border rounded-md shadow-sm
                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            disabled={isAdding}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Price ($)</label>
                            <input
                                type="number" id="price" value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                step="0.01"
                                className={`w-full p-2 border rounded-md shadow-sm
                  ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                                disabled={isAdding}
                            />
                        </div>
                        <div>
                            <label htmlFor="stock" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Stock</label>
                            <input
                                type="number" id="stock" value={stock}
                                onChange={(e) => setStock(e.target.value)}
                                className={`w-full p-2 border rounded-md shadow-sm
                  ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                                disabled={isAdding}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Description</label>
                        <textarea
                            id="description" value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={3}
                            className={`w-full p-2 border rounded-md shadow-sm
                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            disabled={isAdding}
                        ></textarea>
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors
                ${isDarkTheme ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                            disabled={isAdding}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className={`px-4 py-2 rounded-md font-semibold text-white text-sm transition-colors flex items-center justify-center gap-2
                ${isAdding ? 'opacity-70 cursor-not-allowed' : (isDarkTheme ? 'bg-indigo-700 hover:bg-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700')}`}
                            disabled={isAdding}
                        >
                            {isAdding && <Loader2 className="animate-spin" size={18} />}
                            {isAdding ? 'Adding Product...' : 'Add Product'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddProductForm;