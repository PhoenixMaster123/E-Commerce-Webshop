import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

const SalesOverviewChart = () => {
	const { theme } = useTheme();
	const isDark = theme === 'dark';

	return (
		<motion.div
			className={`shadow-lg rounded-xl p-6 border backdrop-blur-md ${
				isDark
					? 'bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100'
					: 'bg-white bg-opacity-80 border-gray-300 text-gray-900'
			}`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4'>Sales Overview</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke={isDark ? "#4B5563" : "#E5E7EB"} />
						<XAxis dataKey={"name"} stroke={isDark ? "#9CA3AF" : "#374151"} />
						<YAxis stroke={isDark ? "#9CA3AF" : "#374151"} />
						<Tooltip
							contentStyle={{
								backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)",
								borderColor: isDark ? "#4B5563" : "#D1D5DB",
							}}
							itemStyle={{ color: isDark ? "#E5E7EB" : "#1F2937" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke={isDark ? "#6366F1" : "#4F46E5"}
							strokeWidth={3}
							dot={{ fill: isDark ? "#6366F1" : "#4F46E5", strokeWidth: 2, r: 6 }}
							activeDot={{ r: 8, strokeWidth: 2 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};

export default SalesOverviewChart;
