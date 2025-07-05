import { useContext } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, ShoppingBag, Users, Zap } from 'lucide-react'

import Header from "../../Components/Admin_Components/Header"
import StatCard from "../../Components/Admin_Components/StatCard"
import SalesOverviewChart from "../../Components/Admin_Components/charts/SalesOverviewChart"
import CategoryDistributionChart from '../../Components/Admin_Components/charts/CategoryDistributionChart'
import SalesChannelChart from '../../Components/Admin_Components/charts/SalesChannelChart'

import { ThemeContext } from '../../contexts/ThemeContext'

const OverviewPage = () => {
    const { isDarkMode } = useContext(ThemeContext)

    const pageBgClass = isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'

    return (
        <div className={`flex-1 overflow-auto relative z-10 ${pageBgClass}`}>
            <Header title='Overview' />

            <main className='max-w-7xl mx-auto py-2 px-0 lg:px-8'>
                <motion.div
                    className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Total Sales' icon={Zap} value='$18,600' color='#6366F1' />
                    <StatCard name='New Users' icon={Users} value='1,234' color='#8B5CF6' />
                    <StatCard name='Total Products' icon={ShoppingBag} value='356' color='#EC4899' />
                    <StatCard name='Conversion Rate' icon={BarChart2} value='20.25%' color='#10B981' />
                </motion.div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    <SalesOverviewChart />
                    <CategoryDistributionChart />
                    <SalesChannelChart />
                </div>
            </main>
        </div>
    )
}

export default OverviewPage
