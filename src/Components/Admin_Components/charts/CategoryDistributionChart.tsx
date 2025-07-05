import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ThemeContext } from '../../../contexts/ThemeContext';
import {useContext} from "react";

interface CustomLegendPayload {
    value: string;
    id?: string | number;
    type?: string;
    color?: string;
}

interface CustomLegendProps {
    payload?: CustomLegendPayload[];
}

const renderCustomLegend = ({ payload }: CustomLegendProps) => {
    if (!payload || payload.length === 0) {
        return null;
    }

    return (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 mt-2 p-0 list-none">
            {payload.map((entry, index) => (
                <li
                    key={`legend-item-${index}`}
                    className="flex items-center space-x-0.5 space-y-1 text-sm cursor-pointer"
                >
                    <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.value}</span>
                </li>
            ))}
        </ul>
    );
};

const categoryData = [
    { name: "Electronics", value: 5200 },
    { name: "Clothes", value: 2800 },
    { name: "Beauty", value: 2400 },
    { name: "Home & Living", value: 3300 },
    { name: "Sunglasses", value: 800 },
    { name: "Sports Accessories", value: 1500 },
    { name: "Automotive", value: 600 },
];

const COLORS: string[] = [
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#EC4899", // Pink
    "#10B981", // Emerald
    "#F59E0B", // Amber
    "#3B82F6", // Blue
    "#EF4444", // Red
    "#84CC16", // Lime
    "#06B6D4", // Cyan
];

const CategoryDistributionChart = () => {
    // --- Theme Management ---
    const { isDarkMode } = useContext(ThemeContext);
    const isDark = isDarkMode;

    return (
        <motion.div
            className={`bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border ${
                isDark
                    ? 'bg-gray-800 border-gray-700 text-gray-100'
                    : 'bg-white border-gray-300 text-gray-900'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <h2 className='text-lg font-medium mb-4'>Category Distribution</h2>
            <div className='h-96'>
                <ResponsiveContainer width={"100%"} height={"100%"}>
                    <PieChart>
                        <Pie
                            data={categoryData}
                            cx={"50%"}
                            cy={"50%"}
                            labelLine={false}
                            outerRadius={80}
                            dataKey="value"
                        >
                            {categoryData.map((_entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: isDark ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.9)",
                                borderColor: isDark ? "#4B5563" : "#D1D5DB",
                            }}
                            itemStyle={{ color: isDark ? "#E5E7EB" : "#1F2937" }}
                        />
                        <Legend
                            content={renderCustomLegend}
                            layout="horizontal"
                            align="center"
                            verticalAlign="bottom"
                            wrapperStyle={{ paddingTop: '16px' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default CategoryDistributionChart;
