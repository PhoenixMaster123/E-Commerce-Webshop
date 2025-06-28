import React from 'react';
import { useTheme } from 'next-themes';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
    { name: 'Mon', '0-4': 120, '4-8': 200, '8-12': 300, '12-16': 450, '16-20': 250, '20-24': 100 },
    { name: 'Tue', '0-4': 100, '4-8': 180, '8-12': 280, '12-16': 400, '16-20': 220, '20-24': 90 },
    { name: 'Wed', '0-4': 130, '4-8': 210, '8-12': 310, '12-16': 480, '16-20': 270, '20-24': 110 },
    { name: 'Thu', '0-4': 150, '4-8': 230, '8-12': 350, '12-16': 500, '16-20': 300, '20-24': 120 },
    { name: 'Fri', '0-4': 110, '4-8': 190, '8-12': 290, '12-16': 420, '16-20': 240, '20-24': 95 },
    { name: 'Sat', '0-4': 80, '4-8': 150, '8-12': 200, '12-16': 280, '16-20': 180, '20-24': 70 },
    { name: 'Sun', '0-4': 70, '4-8': 130, '8-12': 180, '12-16': 250, '16-20': 160, '20-24': 60 },
];

const UserActivityHeatmap: React.FC = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const axisColor = isDarkTheme ? '#6B7280' : '#E5E7EB'; // grid line color
    const textColor = isDarkTheme ? '#E5E7EB' : '#4B5563'; // axis label color

    // Colors roughly matching the image
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#00C49F', '#FFBB28'];

    return (
        <div className={`p-6 rounded-lg shadow-md ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
            <h3 className={`text-lg font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>User Activity Heatmap</h3>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke={axisColor} vertical={false} />
                    <XAxis dataKey="name" stroke={textColor} tickLine={false} axisLine={{ stroke: axisColor }} />
                    <YAxis stroke={textColor} tickLine={false} axisLine={{ stroke: axisColor }} />
                    <Tooltip
                        cursor={{ fill: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)' }} // Light background for tooltip hover
                        contentStyle={{
                            backgroundColor: isDarkTheme ? '#374151' : '#FFFFFF',
                            borderColor: isDarkTheme ? '#4B5563' : '#E5E7EB',
                            color: isDarkTheme ? '#E5E7EB' : '#4B5563'
                        }}
                        itemStyle={{ color: isDarkTheme ? '#E5E7EB' : '#4B5563' }}
                        labelStyle={{ color: isDarkTheme ? '#FFFFFF' : '#1F2937' }}
                    />
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        formatter={(value) => <span style={{ color: isDarkTheme ? '#E5E7EB' : '#4B5563' }}>{value}</span>}
                    />
                    <Bar dataKey="0-4" stackId="a" fill={colors[0]} />
                    <Bar dataKey="4-8" stackId="a" fill={colors[1]} />
                    <Bar dataKey="8-12" stackId="a" fill={colors[2]} />
                    <Bar dataKey="12-16" stackId="a" fill={colors[3]} />
                    <Bar dataKey="16-20" stackId="a" fill={colors[4]} />
                    <Bar dataKey="20-24" stackId="a" fill={colors[5]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default UserActivityHeatmap;