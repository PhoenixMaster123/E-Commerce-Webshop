import { useTheme } from "next-themes";
import Header from "../../Components/Admin_Components/Header";
import Profile from "../../Components/Admin_Components/settings/Profile";
import LanguageSettings from "../../Components/Admin_Components/settings/LanguageSettings";
import TimezoneSettings from "../../Components/Admin_Components/settings/TimezoneSettings";
import DateTimeFormatSettings from "../../Components/Admin_Components/settings/DateTimeFormatSettings";
import AccessibilitySettings from "../../Components/Admin_Components/settings/AccessibilitySettings";
import AutosaveSettings from "../../Components/Admin_Components/settings/AutosaveSettings";
import DataManagementSettings from "../../Components/Admin_Components/settings/DataManagementSettings";
import DefaultFileLocationSettings from "../../Components/Admin_Components/settings/DefaultFileLocationSettings";
import ExportDataSettings from "../../Components/Admin_Components/settings/ExportDataSettings";

const SettingsPage = () => {
    const { theme } = useTheme();

    // Define classes based on the theme
    const bgClass = theme === "dark" ? "bg-gray-900" : "bg-white";
    const textClass = theme === "dark" ? "text-gray-100" : "text-gray-900";

    return (
        <div className={`flex-1 overflow-auto relative z-10 ${bgClass}`}>
            <Header title="Settings"/>
            <main className={`max-w-4xl mx-auto py-6 px-4 lg:px-8 ${textClass}`}>
                <Profile />
                <LanguageSettings />
                <TimezoneSettings />
                <DateTimeFormatSettings />
                <AccessibilitySettings />
                <DataManagementSettings />
                <AutosaveSettings />
                <DefaultFileLocationSettings />
                <ExportDataSettings />
            </main>
        </div>
    );
}

export default SettingsPage;
