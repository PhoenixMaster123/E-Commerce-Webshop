import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ThemeContext } from '../../../contexts/ThemeContext';
import {useContext} from "react";

const salesData = [
	{ month: "Jan", sales: 4000 },
	{ month: "Feb", sales: 3000 },
	{ month: "Mar", sales: 5000 },
	{ month: "Apr", sales: 4500 },
	{ month: "May", sales: 6000 },
	{ month: "Jun", sales: 5500 },
];

const SalesTrendChart = () => {
	// --- Theme Management ---
	const { isDarkMode } = useContext(ThemeContext);
	const isDark = isDarkMode;

	return (
		<motion.div
			className={`shadow-lg rounded-xl p-6 border backdrop-blur-md ${
				isDark
					? 'bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100'
					: 'bg-white bg-opacity-80 border-gray-300 text-gray-900'
			}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold mb-4'>Sales Trend</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke={isDark ? "#374151" : "#E5E7EB"} />
						<XAxis dataKey='month' stroke={isDark ? "#9CA3AF" : "#374151"} />
						<YAxis stroke={isDark ? "#9CA3AF" : "#374151"} />
						<Tooltip
							contentStyle={{
								backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)",
								borderColor: isDark ? "#4B5563" : "#D1D5DB",
							}}
							itemStyle={{ color: isDark ? "#E5E7EB" : "#1F2937" }}
						/>
						<Legend />
						<Line
							type='monotone'
							dataKey='sales'
							stroke={isDark ? "#8B5CF6" : "#6D28D9"}
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesTrendChart;
