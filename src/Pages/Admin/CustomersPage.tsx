import { User, UserPlus, TrendingUp, TrendingDown, Search } from "lucide-react";
import { useState, useEffect } from 'react';
import Header from "../../Components/Admin_Components/Header";
import StatCard from "../../Components/Admin_Components/StatCard";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

// Chart Components (assuming you have these or placeholders for now)
import UserGrowthChart from "../../Components/Admin_Components/charts/UserGrowthChart"; // You'll need to create this
import UserActivityHeatmap from "../../Components/Admin_Components/charts/UserActivityHeatmap"; // You'll need to create this

// Table and Form Components (we will create these)
import CustomersTable from "../../Components/Admin_Components/tables/CustomersTable";
import AddCustomerForm from "../../Components/Admin_Components/form-functionalities/AddCustomerForm";
import EditCustomerForm from "../../Components/Admin_Components/form-functionalities/EditCustomerForm";

// Define Customer interface
interface Customer {
    id: string;
    initial: string; // For the avatar initial
    name: string;
    email: string;
    role: 'Customer' | 'Admin' | 'Moderator';
    status: 'Active' | 'Inactive';
}

const CustomersPage = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const [showAddCustomerForm, setShowAddCustomerForm] = useState(false);
    const [showEditCustomerForm, setShowEditCustomerForm] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    const [customers, setCustomers] = useState<Customer[]>([]);
    const [isAddingCustomer, setIsAddingCustomer] = useState(false);
    const [isUpdatingCustomer, setIsUpdatingCustomer] = useState(false);
    const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    // Simulate fetching initial customer data
    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoadingCustomers(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCustomers([
                { id: 'c1', initial: 'J', name: 'John Doe', email: 'john@example.com', role: 'Customer', status: 'Active' },
                { id: 'c2', initial: 'J', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'Active' },
                { id: 'c3', initial: 'B', name: 'Bob Johnson', email: 'bob@example.com', role: 'Moderator', status: 'Inactive' },
                { id: 'c4', initial: 'A', name: 'Alice Brown', email: 'alice@example.com', role: 'Customer', status: 'Active' },
                { id: 'c5', initial: 'C', name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'Inactive' },
                { id: 'c6', initial: 'D', name: 'Diana Prince', email: 'diana@example.com', role: 'Customer', status: 'Active' },
                { id: 'c7', initial: 'E', name: 'Ethan Hunt', email: 'ethan@example.com', role: 'Customer', status: 'Active' },
                { id: 'c8', initial: 'F', name: 'Fiona Apple', email: 'fiona@example.com', role: 'Moderator', status: 'Inactive' },
                { id: 'c9', initial: 'G', name: 'Gary Oldman', email: 'gary@example.com', role: 'Admin', status: 'Active' },
                { id: 'c10', initial: 'H', name: 'Hannah Montana', email: 'hannah@example.com', role: 'Customer', status: 'Active' },
                { id: 'c11', initial: 'I', name: 'Ivy League', email: 'ivy@example.com', role: 'Customer', status: 'Inactive' },
            ]);
            setIsLoadingCustomers(false);
        };
        fetchCustomers();
    }, []);

    const handleAddCustomer = async (newCustomerData: Omit<Customer, 'id' | 'initial'>) => {
        setIsAddingCustomer(true);
        // Simulate API call to add customer
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newCustomer: Customer = {
            id: Date.now().toString(), // Simple unique ID
            initial: newCustomerData.name.charAt(0).toUpperCase(), // Get initial from name
            ...newCustomerData,
        };
        setCustomers((prevCustomers) => [...prevCustomers, newCustomer].sort((a, b) => a.name.localeCompare(b.name)));
        setIsAddingCustomer(false);
        setShowAddCustomerForm(false);
    };

    const handleUpdateCustomer = async (id: string, updatedData: Partial<Customer>) => {
        setIsUpdatingCustomer(true);
        console.log(`Sending update request for customer ${id}:`, updatedData);
        await new Promise(resolve => setTimeout(resolve, 1000));

        setCustomers(prevCustomers =>
            prevCustomers.map(customer =>
                customer.id === id ? { ...customer, ...updatedData } : customer
            ).sort((a, b) => a.name.localeCompare(b.name))
        );
        setIsUpdatingCustomer(false);
        setShowEditCustomerForm(false);
        setSelectedCustomer(null);
    };

    const handleDeleteCustomer = (id: string) => {
        if (window.confirm(`Are you sure you want to delete customer ${customers.find(c => c.id === id)?.name}?`)) {
            console.log(`Deleting customer with ID: ${id}`);
            setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== id));
            alert(`Customer ${customers.find(c => c.id === id)?.name} deleted successfully.`);
        }
    };

    const openEditForm = (customer: Customer) => {
        setSelectedCustomer(customer);
        setShowEditCustomerForm(true);
    };

    // Calculate stats based on current customers state
    const totalUsers = customers.length;
    const newUsersToday = 243; // Placeholder
    const activeUsers = 98520; // Placeholder
    const churnRate = 2.4; // Placeholder

    return (
        <div className='flex-1 overflow-auto relative z-10'>
            <Header title='Customers' />

            <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
                {/* STATS */}
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Users' icon={User} value={totalUsers.toLocaleString()} color='#6366F1' />
                    <StatCard name='New Users Today' icon={UserPlus} value={newUsersToday} color='#10B981' />
                    <StatCard name='Active Users' icon={TrendingUp} value={activeUsers.toLocaleString()} color='#F59E0B' />
                    <StatCard name='Churn Rate' icon={TrendingDown} value={`${churnRate}%`} color='#EF4444' />
                </motion.div>

                {/* Search Bar and Add Customer Button */}
                <div className="flex justify-end items-center mb-6">
                    <div className={`relative flex items-center mr-4
                        ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                        <Search className="absolute left-3" size={18} />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`pl-10 pr-4 py-2 rounded-md border
                                ${isDarkTheme ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}
                                focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                            disabled={isLoadingCustomers || isAddingCustomer || isUpdatingCustomer}
                        />
                    </div>
                    <motion.button
                        onClick={() => setShowAddCustomerForm(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-700 dark:hover:bg-indigo-800 dark:focus:ring-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isAddingCustomer || isLoadingCustomers || isUpdatingCustomer}
                    >
                        <UserPlus className="mr-2" size={18} />
                        Add New Customer
                    </motion.button>
                </div>

                {/* Customer List Table */}
                <CustomersTable
                    customers={customers}
                    isLoading={isLoadingCustomers}
                    searchQuery={searchQuery}
                    onUpdateCustomer={openEditForm}
                    onDeleteCustomer={handleDeleteCustomer}
                />

                {/* CHARTS */}
                <div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
                    {/* Placeholder charts for now, you can replace with actual implementations */}
                    <UserGrowthChart />
                    <UserActivityHeatmap />
                </div>
            </main>

            {/* Add Customer Form Modal */}
            <AnimatePresence>
                {showAddCustomerForm && (
                    <AddCustomerForm
                        onClose={() => setShowAddCustomerForm(false)}
                        onAddCustomer={handleAddCustomer}
                        isAdding={isAddingCustomer}
                    />
                )}
            </AnimatePresence>

            {/* Edit Customer Form Modal */}
            <AnimatePresence>
                {showEditCustomerForm && selectedCustomer && (
                    <EditCustomerForm
                        customer={selectedCustomer}
                        onClose={() => {setShowEditCustomerForm(false); setSelectedCustomer(null);}}
                        onUpdateCustomer={handleUpdateCustomer}
                        isUpdating={isUpdatingCustomer}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
export default CustomersPage;