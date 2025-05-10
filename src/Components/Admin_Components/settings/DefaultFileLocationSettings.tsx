import { FolderIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";
import React, { useState } from 'react';

const DefaultFileLocationSettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  const [defaultPath, setDefaultPath] = useState('/Downloads/MyAppFiles');

  // Add logic here to handle changing the default path
   const handlePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       const newPath = event.target.value;
       setDefaultPath(newPath);
       console.log("Default File Location set to:", newPath);
   };

  return (
    <SettingSection icon={FolderIcon} title={"Default File Location"} theme={themeToPass}>
      {/* Content for Default File Location setting */}
      <div className={`flex flex-col space-y-4 ${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p>Set the default folder for downloads or exported files.</p>

        {/* Default Path Input */}
        <div>
            <label htmlFor="defaultPath" className="block mb-2 font-medium">Default Path:</label>
             <input
                id="defaultPath"
                type="text"
                value={defaultPath}
                onChange={handlePathChange}
                className={`${themeToPass === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded px-3 py-2 border w-full`}
                placeholder="e.g., /Documents/MyApp Downloads"
            />
             <p className="text-sm opacity-80 mt-1">Note: Browser security may override this setting for downloads.</p>
        </div>

      </div>
    </SettingSection>
  );
};

export default DefaultFileLocationSettings;