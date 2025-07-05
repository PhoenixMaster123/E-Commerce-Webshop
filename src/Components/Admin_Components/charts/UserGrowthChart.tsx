import React from 'react';
import { useTheme } from 'next-themes';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const data = [
    { name: 'Jul', users: 4000 },
    { name: 'Aug', users: 3000 },
    { name: 'Sep', users: 5000 },
    { name: 'Oct', users: 2780 },
    { name: 'Nov', users: 1890 },
    { name: 'Dec', users: 2390 },
    { name: 'Jan', users: 3490 },
    { name: 'Feb', users: 4200 },
    { name: 'Mar', users: 2900 },
    { name: 'Apr', users: 5500 },
    { name: 'May', users: 2000 },
    { name: 'Jun', users: 3000 }, // Current month placeholder
];

const UserGrowthChart: React.FC = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const axisColor = isDarkTheme ? '#6B7280' : '#E5E7EB'; // grid line color
    const textColor = isDarkTheme ? '#E5E7EB' : '#4B5563'; // axis label color

    return (
        <div className={`p-6 rounded-lg shadow-md ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>User Growth</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
                    <XAxis dataKey="name" stroke={textColor} tickLine={false} axisLine={{ stroke: axisColor }} />
                    <YAxis stroke={textColor} tickLine={false} axisLine={{ stroke: axisColor }} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDarkTheme ? '#374151' : '#FFFFFF',
                            borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB',
                            color: isDarkTheme ? '#E5E7EB' : '#4B5563'
                        }}
                        itemStyle={{ color: isDarkTheme ? '#E5E7EB' : '#4B5563' }}
                        labelStyle={{ color: isDarkTheme ? '#FFFFFF' : '#1F2937' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="users"
                        stroke="#818CF8" // A nice indigo color
                        activeDot={{ r: 8 }}
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserGrowthChart;