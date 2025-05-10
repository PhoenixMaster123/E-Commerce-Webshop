import { SaveIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import { useTheme } from "next-themes";
import React, { useState } from 'react';

const AutosaveSettings = () => {
  const { theme } = useTheme();
  const themeToPass = theme === "dark" ? "dark" : "light";

  // Example state for autosave frequency (in minutes)
  const [autosaveFrequency, setAutosaveFrequency] = useState('5');

  // Add logic here to save and implement the autosave preference
   const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
       const newFrequency = event.target.value;
       setAutosaveFrequency(newFrequency);
       console.log("Autosave Frequency set to:", newFrequency, "minutes");
   };


  return (
    <SettingSection icon={SaveIcon} title={"Autosave"} theme={themeToPass}>
      {/* Content for Autosave setting */}
      <div className={`${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mb-4">Set how often your changes are automatically saved.</p>

        {/* Autosave Frequency Selection */}
         <div className="flex items-center">
            <label htmlFor="autosaveFrequency" className="mr-4 font-medium">Save every:</label>
             <select
                id="autosaveFrequency"
                value={autosaveFrequency}
                onChange={handleFrequencyChange}
                className={`${themeToPass === 'dark' ? 'bg-gray-700 text-gray-100 border-gray-600' : 'bg-white text-gray-900 border-gray-300'} rounded px-3 py-2 border`}
            >
                <option value="1">1 minute</option>
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                 <option value="15">15 minutes</option>
                <option value="0">Off</option>
            </select>
        </div>
      </div>
    </SettingSection>
  );
};

export default AutosaveSettings;