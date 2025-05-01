import { User } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes"; // Import useTheme

const Profile = () => {
	const { theme } = useTheme(); // Get the current theme from useTheme
	const themeToPass: "light" | "dark" = theme === "dark" ? "dark" : "light"; // Ensure theme is either "light" or "dark"

	return (
		<SettingSection icon={User} title={"Profile"} theme={themeToPass}>
			<div className="flex flex-col sm:flex-row items-center mb-6">
				<img
					src=""
					alt="Profile"
					className="rounded-full w-20 h-20 object-cover mr-4"
				/>

				<div>
					<h3 className="text-lg font-semibold text-gray-100">John Doe</h3>
					<p className="text-gray-400">john.doe@example.com</p>
				</div>
			</div>

			<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto">
				Edit Profile
			</button>
		</SettingSection>
	);
};

export default Profile;
