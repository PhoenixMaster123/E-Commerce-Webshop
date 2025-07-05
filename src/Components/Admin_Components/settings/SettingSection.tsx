import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import {useContext} from "react";
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

type SettingsProps = {
	icon: LucideIcon;
	title: string;
	children: React.ReactNode;
	theme:  "dark" | "light" | "system" | undefined;
};

const SettingSection = ({ icon: Icon, title, children}: SettingsProps) => {
	// --- Theme Management ---
	const { isDarkMode } = useContext(ThemeContext);

	return (
		<motion.div
			className={`${
				isDarkMode
					? 'bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg border-gray-700'
					: 'bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg shadow-lg border-gray-300'
			} rounded-xl p-6 mb-8`}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<div className={`flex items-center mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
				<Icon className={`mr-4 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} size="24" />
				<h2 className={`text-xl font-semibold ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
					{title}
				</h2>
			</div>
			{children}
		</motion.div>
	);
};

export default SettingSection;
