import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";
import { useNavigate } from 'react-router-dom';

const Profile = () => {
	const { theme } = useTheme();
	const isDarkTheme = theme === "dark";
	const navigate = useNavigate();

	const handleEditProfileClick = () => {
		navigate('/admin/account/settings');
	};

	return (
		<SettingSection icon={User} title={"Profile"} theme={isDarkTheme ? "dark" : "light"}>
			<div className="flex flex-col sm:flex-row items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-6">
				<div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0">
					<div className={`w-full h-full rounded-full flex items-center justify-center text-5xl font-bold
                                 ${isDarkTheme ? 'bg-gray-700 text-gray-400 border-2 border-gray-600' : 'bg-gray-200 text-gray-500 border-2 border-gray-300'}`}>
						JD
					</div>
				</div>

				{/* User Info */}
				<div className="text-center sm:text-left">
					<h3 className={`text-xl font-semibold mb-1 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>John Doe</h3>
					<p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>john.doe@example.com</p>
					<p className={`text-sm ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'}`}>Admin User</p>
				</div>
			</div>

			{/* Edit Profile Button */}
			<button
				onClick={handleEditProfileClick}
				className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium transition-colors duration-200 ease-in-out
                        ${isDarkTheme
					? 'bg-indigo-700 hover:bg-indigo-600 text-white shadow-md'
					: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
				}
                        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                        ${isDarkTheme ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
                        `}
			>
				Edit Profile
			</button>
		</SettingSection>
	);
};

export default Profile;