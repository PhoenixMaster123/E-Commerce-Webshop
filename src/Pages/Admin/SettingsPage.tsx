import Header from "../../Components/Admin_Components/Header"
import Profile from "../../Components/Admin_Components/settings/Profile"
import Notifications from "../../Components/Admin_Components/settings/Notifications"
import Security from "../../Components/Admin_Components/settings/Security"
import ConnectedAccounts from "../../Components/Admin_Components/settings/ConnectedAccounts"
import DangerZone from "../../Components/Admin_Components/settings/DangerZone"

const SettingsPage = () => {
    return <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
        <Header title="Settings"/>
        <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
            <Profile />
            <Notifications />
            <Security />
            <ConnectedAccounts />
            <DangerZone />
        </main>
    </div>
}
export default SettingsPage