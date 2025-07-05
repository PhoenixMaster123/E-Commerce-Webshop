import { DatabaseIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import {useContext} from "react";
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

const DataManagementSettings = () => {
  // --- Theme Management ---
  const { isDarkMode } = useContext(ThemeContext);
  const themeToPass = isDarkMode  ? "dark" : "light";

  const handleClearCache = () => {
      console.log("Clearing application cache...");
      alert("Cache cleared (simulated).");
  };

  return (
    <SettingSection icon={DatabaseIcon} title={"Data Management"} theme={themeToPass}>
      {/* Content for Data Management setting */}
      <div className={`flex flex-col space-y-4 ${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p>Manage application data stored locally.</p>

        {/* Clear Cache Option */}
        <div className="flex items-center justify-between">
             <span>Clear application cache</span>
              <button
                onClick={handleClearCache}
                className={`${themeToPass === 'dark'
                    ? 'bg-red-700 hover:bg-red-800 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                } font-bold py-2 px-4 rounded transition duration-200`}
             >
                Clear Cache
             </button>
        </div>
      </div>
    </SettingSection>
  );
};

export default DataManagementSettings;