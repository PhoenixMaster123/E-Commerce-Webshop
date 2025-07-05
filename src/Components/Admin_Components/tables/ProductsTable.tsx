import React, {useState, useEffect, useContext} from 'react';
import { Loader2, SquarePen, Trash2, Package } from 'lucide-react';
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

interface Product {
	id: string;
	name: string;
	category: string;
	price: number;
	stock: number;
	description: string;
}

interface ProductsTableProps {
	products: Product[];
	isLoading: boolean;
	searchQuery: string;
	onUpdateProduct: (product: Product) => void;
	onDeleteProduct: (id: string) => void;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ products, isLoading, searchQuery, onUpdateProduct, onDeleteProduct }) => {
	// --- Theme Management ---
	const { isDarkMode } = useContext(ThemeContext);
	const isDarkTheme = isDarkMode;

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const filteredProducts = products.filter(product =>
		product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
		product.description.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

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
				<Loader2 className="animate-spin mr-3" size={24} /> Loading products...
			</div>
		);
	}

	if (!products || products.length === 0) {
		return (
			<div className={`p-6 rounded-lg shadow-md mb-8 text-center
        ${isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'}`}>
				<p>No products found. Click "Add Product" to create one!</p>
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
							Icon
						</th>
						<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Product Name
						</th>
						<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Category
						</th>
						<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Price
						</th>
						<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Stock
						</th>
						<th scope="col" className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Description
						</th>
						<th scope="col" className={`px-6 py-3 text-right text-xs font-medium uppercase tracking-wider
                ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
							Actions
						</th>
					</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
					{currentProducts.map((product) => (
						<tr
							key={product.id}
							className={`${isDarkTheme ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
						>
							<td className="px-6 py-4 whitespace-nowrap">
								<div className="flex items-center justify-center h-10 w-10 rounded-full bg-white-200 dark:bg-white-600">
									<Package size={24} className={`${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`} />
								</div>
							</td>
							<td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
								{product.name}
							</td>
							<td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
								{product.category}
							</td>
							<td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
								${product.price.toFixed(2)}
							</td>
							<td className={`px-6 py-4 whitespace-nowrap text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
								{product.stock}
							</td>
							<td className={`px-6 py-4 text-sm max-w-xs truncate ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}>
								{product.description}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<button
									onClick={() => onUpdateProduct(product)}
									className={`inline-flex items-center text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-4`}
									title="Edit Product"
								>
									<SquarePen size={18} />
								</button>
								<button
									onClick={() => onDeleteProduct(product.id)}
									className={`inline-flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300`}
									title="Delete Product"
								>
									<Trash2 size={18} />
								</button>
							</td>
						</tr>
					))}
					{currentProducts.length === 0 && filteredProducts.length > 0 && (
						<tr>
							<td colSpan={7} className={`px-6 py-4 text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
								No products found on this page. Try navigating.
							</td>
						</tr>
					)}
					{filteredProducts.length === 0 && searchQuery !== '' && (
						<tr>
							<td colSpan={7} className={`px-6 py-4 text-center text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
								No products match your search.
							</td>
						</tr>
					)}
					</tbody>
				</table>
			</div>

			{/* Pagination Controls */}
			{filteredProducts.length > itemsPerPage && (
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
								Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to <span className="font-medium">{Math.min(indexOfLastItem, filteredProducts.length)}</span> of{' '}
								<span className="font-medium">{filteredProducts.length}</span> results
							</p>
						</div>
					</div>
				</nav>
			)}
		</div>
	);
};

export default ProductsTable;