import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";

const PRODUCT_DATA = [
	{ id: 1, name: "Wireless Earbuds", category: "Electronics", price: 59.99, stock: 143, sales: 1200 },
	{ id: 2, name: "Leather Wallet", category: "Accessories", price: 39.99, stock: 89, sales: 800 },
	{ id: 3, name: "Smart Watch", category: "Electronics", price: 199.99, stock: 56, sales: 650 },
	{ id: 4, name: "Yoga Mat", category: "Fitness", price: 29.99, stock: 210, sales: 950 },
	{ id: 5, name: "Coffee Maker", category: "Home", price: 79.99, stock: 78, sales: 720 },
];

const ProductsTable = () => {
	const { theme } = useTheme();
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = PRODUCT_DATA.filter(
			(product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
		);

		setFilteredProducts(filtered);
	};

	const tableBgClass = theme === "dark" ? "bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100" : "bg-white bg-opacity-80 border-gray-300 text-gray-900";
	const actionBtnClass = theme === "dark" ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-500";
	const trashBtnClass = theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-500";
	const inputClass = theme === "dark"
		? "bg-gray-700 text-white placeholder-gray-400"
		: "bg-gray-200 text-gray-900 placeholder-gray-500";

	return (
		<motion.div
			className={`p-6 rounded-xl shadow-lg mb-8 backdrop-blur-md border ${tableBgClass}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-xl font-semibold">Product List</h2>
				<div className="flex items-center gap-4 relative">
					<input
						type="text"
						placeholder="Search products..."
						className={`rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputClass}`}
						onChange={handleSearch}
						value={searchTerm}
					/>
					<Search className="absolute left-3 top-2.5" size={18} />
					<button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium rounded-xl shadow-md hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg transition duration-300">
						Add Product
					</button>
				</div>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full divide-y">
					<thead>
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Stock</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Sales</th>
						<th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
					</tr>
					</thead>

					<tbody>
					{filteredProducts.map((product) => (
						<motion.tr
							key={product.id}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.3 }}
						>
							<td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2 items-center">
								<img alt="Product img" className="size-10 rounded-full" />
								{product.name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">{product.category}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">${product.price.toFixed(2)}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">{product.stock}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">{product.sales}</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm">
								<button className={`${actionBtnClass} mr-2`}>
									<Edit size={18} />
								</button>
								<button className={trashBtnClass}>
									<Trash2 size={18} />
								</button>
							</td>
						</motion.tr>
					))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};

export default ProductsTable;
