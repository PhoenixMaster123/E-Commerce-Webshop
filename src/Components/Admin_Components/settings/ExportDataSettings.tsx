import { DownloadIcon } from "lucide-react";
import SettingSection from "./SettingSection";
import {useContext, useState} from 'react';
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

const ExportDataSettings = () => {
  // --- Theme Management ---
  const { isDarkMode } = useContext(ThemeContext);
  const themeToPass = isDarkMode ? "dark" : "light";

  const [isExporting, setIsExporting] = useState(false);
  const handleExportDataClick = async () => {
      setIsExporting(true);
      console.log("Initiating Data Export...");
      try {
          // --- Placeholder for actual export logic ---
          await new Promise(resolve => setTimeout(resolve, 2000));
          console.log("Data export prepared. Triggering download...");
          const dummyData = JSON.stringify({ user: "John Doe", settings: { theme: "dark" } }, null, 2);
          const blob = new Blob([dummyData], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'user_data.json';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          // --- End Placeholder ---

          alert("Your data export has been prepared and download should start shortly.");
      } catch (error) {
          console.error("Error during data export:", error);
          alert("Failed to export data. Please try again.");
      } finally {
          setIsExporting(false);
      }
  };


  return (
    <SettingSection icon={DownloadIcon} title={"Export Data"} theme={themeToPass}>
      {/* Content for Export Data setting */}
      <div className={`flex items-center justify-between ${themeToPass === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
        <p className="mr-4">Download a copy of your account data.</p>
        <button
          onClick={handleExportDataClick}
          disabled={isExporting}
          className={`${themeToPass === 'dark'
              ? 'bg-blue-700 hover:bg-blue-800'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white font-bold py-2 px-4 rounded transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isExporting ? 'Preparing...' : 'Export My Data'}
        </button>
      </div>
    </SettingSection>
  );
};

export default ExportDataSettings;