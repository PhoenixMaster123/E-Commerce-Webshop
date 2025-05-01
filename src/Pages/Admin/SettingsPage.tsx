import { useTheme } from "next-themes";
import Header from "../../Components/Admin_Components/Header";
import Profile from "../../Components/Admin_Components/settings/Profile";
import Notifications from "../../Components/Admin_Components/settings/Notifications";
import Security from "../../Components/Admin_Components/settings/Security";
import ConnectedAccounts from "../../Components/Admin_Components/settings/ConnectedAccounts";
import DangerZone from "../../Components/Admin_Components/settings/DangerZone";

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
                <Notifications />
                <Security />
                <ConnectedAccounts />
                <DangerZone />
            </main>
        </div>
    );
}

export default SettingsPage;
