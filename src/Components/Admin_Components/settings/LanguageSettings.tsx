import { GlobeIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";

const LanguageSettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  return (
    <SettingSection icon={GlobeIcon} title={"Language"} theme={themeToPass}>
      {/* Content for Language setting */}
      <div className={`${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4">Choose the display language for the application.</p>
        <select className={`${themeToPass === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded px-3 py-2 border`}>
          <option value="en">English</option>
          <option value="ge">German</option>
          <option value="bg">Bulgarian</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
    </SettingSection>
  );
};

export default LanguageSettings;