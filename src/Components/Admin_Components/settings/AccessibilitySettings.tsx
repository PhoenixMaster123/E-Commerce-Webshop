import { AccessibilityIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";
import React, { useState } from 'react';

const AccessibilitySettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  // Example state for font size preference
  const [fontSize, setFontSize] = useState('medium');

   const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
       const newSize = event.target.value;
       setFontSize(newSize);
       console.log("Font Size Changed to:", newSize);
       // Apply font size change globally
   };

  return (
    <SettingSection icon={AccessibilityIcon} title={"Accessibility"} theme={themeToPass}>
      {/* Content for Accessibility setting */}
      <div className={`${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4">Adjust settings to improve application usability.</p>

        {/* Font Size Selection */}
        <div className="flex items-center">
            <label htmlFor="fontSize" className="mr-4 font-medium">Font Size:</label>
             <select
                id="fontSize"
                value={fontSize}
                onChange={handleFontSizeChange}
                className={`${themeToPass === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded px-3 py-2 border`}
            >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
        </div>

      </div>
    </SettingSection>
  );
};

export default AccessibilitySettings;