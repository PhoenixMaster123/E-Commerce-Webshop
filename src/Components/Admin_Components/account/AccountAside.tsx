import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faKey, faMobile, faSliders, faTrash, faUser} from "@fortawesome/free-solid-svg-icons";

// Sidebar items with correct icon assignment
const Account_SIDEBAR_ITEMS = [
  { name: "Profile", icon: faUser, color: "#ea00ff", href: "/admin/account" },
  { name: "Profile Settings", icon: faSliders, color: "#8B5CF6", href: "/admin/account/settings" },
  { name: "Password & Security", icon: faKey, color: "#fc9403", href: "/admin/account/password" },
  { name: "Notifications", icon: faBell, color: "#036ffc", href: "/admin/account/notifications"},
  { name: "Social Accounts", icon: faMobile, color: "#6EE7B7", href: "/admin/account/social"},
  { name: "Delete Account", icon: faTrash, color: "#fc0303", href: "/admin/account/delete"},
];

const AccountAside = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();

  const bgClass =
    theme === "dark"
      ? "bg-gray-800 bg-opacity-50 border-gray-700"
      : "bg-white bg-opacity-80 border-gray-300";

  const hoverClass = theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-800";

  return (
    <motion.div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
      animate={{ width: isSidebarOpen ? 256 : 80 }}
    >
      <div className={`h-full ${bgClass} backdrop-blur-md p-4 flex flex-col border-r`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`p-2 rounded-full ${hoverClass} transition-colors max-w-fit`}
        >
        </motion.button>

        <nav className="mt-2 flex-grow">
          {Account_SIDEBAR_ITEMS.map((item) => (
            <Link key={item.href} to={item.href}>
              <motion.div
                className={`flex items-center p-5 text-sm font-medium rounded-lg ${hoverClass} ${textClass} transition-colors mb-2`}
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  style={{ color: item.color, minWidth: "45px" }}
                  size="lg"
                />
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      className="ml-4 whitespace-nowrap"
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2, delay: 0.3 }}
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default AccountAside;
