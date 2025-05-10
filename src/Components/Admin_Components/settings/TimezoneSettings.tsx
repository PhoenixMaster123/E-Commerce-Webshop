import { ClockIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";

const TimezoneSettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  return (
    <SettingSection icon={ClockIcon} title={"Timezone"} theme={themeToPass}>
      {/* Content for Timezone setting */}
      <div className={`${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4">Set the preferred timezone for timestamps and scheduling.</p>
        <select className={`${themeToPass === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded px-3 py-2 border`}>
          <option value="UTC">UTC</option>
          <option value="EST">Eastern Standard Time (EST)</option>
          <option value="CET">Central European Time (CET)</option>
        </select>
      </div>
    </SettingSection>
  );
};

export default TimezoneSettings;