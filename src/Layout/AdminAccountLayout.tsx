import Header from '../Components/Admin_Components/Header'
import AccountAside from '../Components/Admin_Components/account/AccountAside'
import { Outlet } from "react-router-dom";

const AdminAccountLayout = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
    <Header title="Settings" />
    <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8 flex gap-4">
      {/* Aside menu with border */}
      <AccountAside />
       <Outlet />
    </div>
  </div>
  )
}

export default AdminAccountLayout