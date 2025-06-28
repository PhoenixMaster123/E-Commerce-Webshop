import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, X } from 'lucide-react';
import { useTheme } from 'next-themes';

interface AddCustomerFormProps {
    onClose: () => void;
    onAddCustomer: (newCustomerData: { name: string; email: string; role: 'Customer' | 'Admin' | 'Moderator'; status: 'Active' | 'Inactive'; }) => void;
    isAdding: boolean;
}

const AddCustomerForm: React.FC<AddCustomerFormProps> = ({ onClose, onAddCustomer, isAdding }) => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<'Customer' | 'Admin' | 'Moderator'>('Customer');
    const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!name || !email || !role || !status) {
            setError('All fields are required.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        onAddCustomer({
            name,
            email,
            role,
            status,
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
                <h2 className={`text-2xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Add New Customer</h2>

                {error && (
                    <div className="mb-4 text-red-500 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Name</label>
                        <input
                            type="text" id="name" value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`w-full p-2 border rounded-md shadow-sm
                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            disabled={isAdding}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
                        <input
                            type="email" id="email" value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-2 border rounded-md shadow-sm
                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                            disabled={isAdding}
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="role" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Role</label>
                            <select
                                id="role" value={role}
                                onChange={(e) => setRole(e.target.value as 'Customer' | 'Admin' | 'Moderator')}
                                className={`w-full p-2 border rounded-md shadow-sm
                  ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                                disabled={isAdding}
                            >
                                <option value="Customer">Customer</option>
                                <option value="Admin">Admin</option>
                                <option value="Moderator">Moderator</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="status" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Status</label>
                            <select
                                id="status" value={status}
                                onChange={(e) => setStatus(e.target.value as 'Active' | 'Inactive')}
                                className={`w-full p-2 border rounded-md shadow-sm
                  ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                                disabled={isAdding}
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>
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
                            {isAdding ? 'Adding Customer...' : 'Add Customer'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default AddCustomerForm;