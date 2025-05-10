import { CalendarDaysIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";

const DateTimeFormatSettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  return (
    <SettingSection icon={CalendarDaysIcon} title={"Date/Time Format"} theme={themeToPass}>
      {/* Content for Date/Time Format setting */}
      <div className={`${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4">Specify how dates and times are displayed throughout the application.</p>
        <div className="flex flex-col space-y-2">
            <label className="inline-flex items-center">
              <input type="radio" name="datetimeFormat" value="MM/DD/YYYY HH:mm" className={`${themeToPass === 'dark' ? 'form-radio text-indigo-400 border-gray-600 bg-gray-700' : 'form-radio text-indigo-600 border-gray-300 bg-white'}`} />
              <span className="ml-2">MM/DD/YYYY HH:mm (e.g., 05/10/2025 10:30)</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="datetimeFormat" value="DD/MM/YYYY HH:mm" className={`${themeToPass === 'dark' ? 'form-radio text-indigo-400 border-gray-600 bg-gray-700' : 'form-radio text-indigo-600 border-gray-300 bg-white'}`} />
              <span className="ml-2">DD/MM/YYYY HH:mm (e.g., 10/05/2025 10:30)</span>
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="datetimeFormat" value="YYYY-MM-DD HH:mm" className={`${themeToPass === 'dark' ? 'form-radio text-indigo-400 border-gray-600 bg-gray-700' : 'form-radio text-indigo-600 border-gray-300 bg-white'}`} />
              <span className="ml-2">YYYY-MM-DD HH:mm (e.g., 2025-05-10 10:30)</span>
            </label>
          </div>
      </div>
    </SettingSection>
  );
};

export default DateTimeFormatSettings;