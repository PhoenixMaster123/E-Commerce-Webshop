import React, {useState, useEffect, useContext} from 'react';
import { Loader2, SquarePen, Trash2} from 'lucide-react';
import { ThemeContext } from '../../../contexts/ThemeContext';

// Define Customer interface
interface Customer {
    id: string;
    initial: string;
    name: string;
    email: string;
    role: 'Customer' | 'Admin' | 'Moderator';
    status: 'Active' | 'Inactive';
}

interface CustomersTableProps {
    customers: Customer[];
    isLoading: boolean;
    searchQuery: string;
    onUpdateCustomer: (customer: Customer) => void;
    onDeleteCustomer: (id: string) => void;
}

const CustomersTable: React.FC<CustomersTableProps> = ({ customers, isLoading, searchQuery, onUpdateCustomer, onDeleteCustomer }) => {
    // --- Theme Management ---
    const { isDarkMode } = useContext(ThemeContext);
    const isDarkTheme = isDarkMode;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Filter customers based on search query
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    if (isLoading) {
        return (
            <div className={`flex items-center justify-center min-h-[200px] rounded-lg shadow-md mb-8
        ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
                <Loader2 className="animate-spin mr-3" size={24} /> Loading customers...
            </div>
        );
    }

    if (!customers || customers.length === 0) {
        return (
            <div className={`p-6 rounded-lg shadow-md mb-8 text-center
        ${isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                <p>No customers found. Click "Add New Customer" to create one!</p>
            </div>
        );
    }

    return (
        <div className={`rounded-lg shadow-md mb-8 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={`${isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <tr>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                            Name
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                            Email
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                            Role
                        </th>
                        <th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                            Status
                        </th>
                        <th scope="col" className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {currentCustomers.map((customer) => (
                        <tr
                            key={customer.id}
                            className={`${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                        >
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center text-lg font-semibold
                      ${isDarkTheme ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-800'}`}>
                                        {customer.initial}
                                    </div>
                                    <div className="ml-4">
                                        <div className={`text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                                            {customer.name}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
                                {customer.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${customer.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100' :
                      customer.role === 'Moderator' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' :
                          'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'}`}>
                    {customer.role}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${customer.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100' :
                      'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'}`}>
                    {customer.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                    onClick={() => onUpdateCustomer(customer)}
                                    className={`inline-flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4`}
                                    title="Edit Customer"
                                >
                                    <SquarePen size={18} />
                                </button>
                                <button
                                    onClick={() => onDeleteCustomer(customer.id)}
                                    className={`inline-flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300`}
                                    title="Delete Customer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentCustomers.length === 0 && filteredCustomers.length > 0 && (
                        <tr>
                            <td colSpan={5} className={`px-6 py-4 text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                No customers found on this page. Try navigating.
                            </td>
                        </tr>
                    )}
                    {filteredCustomers.length === 0 && searchQuery !== '' && (
                        <tr>
                            <td colSpan={5} className={`px-6 py-4 text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                No customers match your search.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {filteredCustomers.length > itemsPerPage && (
                <nav
                    className={`px-4 py-3 flex items-center justify-between border-t
            ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}
                    aria-label="Pagination"
                >
                    <div className="flex-1 flex justify-between sm:justify-end">
                        <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                ${isDarkTheme ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Previous
                        </button>
                        <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md
                ${isDarkTheme ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border-gray-600' : 'bg-white text-gray-700 hover:bg-gray-50'}
                disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                            Next
                        </button>
                    </div>
                    <div className={`hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ml-4 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                        <div>
                            <p className="text-sm">
                                Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredCustomers.length)}</span> of{' '}
                                <span className="font-medium">{filteredCustomers.length}</span> results
                            </p>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};

export default CustomersTable;