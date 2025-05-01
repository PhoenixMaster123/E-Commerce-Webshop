import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";
import { useTheme } from "next-themes";

const COLORS = ["#6366F1", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

const SALES_CHANNEL_DATA = [
	{ name: "Website", value: 45600 },
	{ name: "Mobile App", value: 38200 },
	{ name: "Marketplace", value: 29800 },
	{ name: "Social Media", value: 18700 },
];

const SalesChannelChart = () => {
	const { theme } = useTheme();

	const isDark = theme === 'dark';

	return (
		<motion.div
			className={`shadow-lg rounded-xl p-6 lg:col-span-2 border backdrop-blur-md ${
				isDark
					? 'bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100'
					: 'bg-white bg-opacity-80 border-gray-300 text-gray-900'
			}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-lg font-medium mb-4'>Sales by Channel</h2>

			<div className='h-60'>
				<ResponsiveContainer>
					<BarChart data={SALES_CHANNEL_DATA}>
						<CartesianGrid strokeDasharray='3 3' stroke={isDark ? "#4B5563" : "#E5E7EB"} />
						<XAxis dataKey='name' stroke={isDark ? "#9CA3AF" : "#374151"} />
						<YAxis stroke={isDark ? "#9CA3AF" : "#374151"} />
						<Tooltip
							contentStyle={{
								backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)",
								borderColor: isDark ? "#4B5563" : "#D1D5DB",
							}}
							itemStyle={{ color: isDark ? "#E5E7EB" : "#1F2937" }}
						/>
						<Legend />
						<Bar dataKey={"value"}>
							{SALES_CHANNEL_DATA.map((_entry, index) => (
								<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesChannelChart;
