import { LucideIcon } from 'lucide-react';
import { motion } from "framer-motion";
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

type StatProps = {
    name: string;
    icon: LucideIcon;
    value: string | number;
    color: string;
};

const StatCard = ({ name, icon: Icon, value, color }: StatProps) => {
    // --- Theme Management ---
    const { isDarkMode } = useContext(ThemeContext);

    const bgClass = isDarkMode
        ? 'bg-gray-800 bg-opacity-50 border-gray-700 text-gray-100'
        : 'bg-white bg-opacity-80 border-gray-300 text-gray-900';

    const subTextClass = isDarkMode ? 'text-gray-400' : 'text-gray-600';

    return (
        <motion.div
            className={`overflow-hidden shadow-lg rounded-xl border backdrop-blur-md ${bgClass}`}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        >
            <div className='px-4 py-5 sm:p-6'>
                <span className={`flex items-center text-sm font-medium ${subTextClass}`}>
                    <Icon size={20} className='mr-2' style={{ color }} />
                    {name}
                </span>
                <p className='mt-1 text-3xl font-semibold'>{value}</p>
            </div>
        </motion.div>
    );
};

export default StatCard;
