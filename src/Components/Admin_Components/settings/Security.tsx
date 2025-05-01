import { Lock } from "lucide-react";
import SettingSection from "./SettingSection";
import ToggleSwitch from "./ToggleSwitch";
import { useState } from "react";
import { useTheme } from "next-themes"; // Import useTheme

const Security = () => {
	const [twoFactor, setTwoFactor] = useState(false);

	const { theme } = useTheme(); // Get the theme from useTheme
	const themeToPass: "light" | "dark" = theme === "dark" ? "dark" : "light"; // Ensure theme is either "light" or "dark"

	return (
		<SettingSection icon={Lock} title={"Security"} theme={themeToPass}>
			<ToggleSwitch
				label={"Two-Factor Authentication"}
				isOn={twoFactor}
				onToggle={() => setTwoFactor(!twoFactor)}
			/>
			<div className="mt-4">
				<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200">
					Change Password
				</button>
			</div>
		</SettingSection>
	);
};

export default Security;
