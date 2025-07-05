import {BarChart2, Menu, Settings, ShoppingBag, Users, User, LogOut} from "lucide-react";
import React, { useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useAuth } from "../../auth/useAuth";

interface SidebarItem {
  name: string;
  icon: React.ElementType;
  color: string;
  href?: string;
  onClick?: () => void;
}

const Sidebar = () => {
  // --- Theme Management ---
  const { isDarkMode } = useContext(ThemeContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarItems: SidebarItem[] = [
    {
      name: "Overview",
      icon: BarChart2,
      color: "#6366f1",
      href: "/admin",
    },
    { name: "Products", icon: ShoppingBag, color: "#8B5CF6", href: "/admin/products" },
    { name: "Customers", icon: Users, color: "#EC4899", href: "/admin/customers" },
    { name: "Account", icon: User, color: "#3B82F6", href: "/admin/account" },
    { name: "General Settings", icon: Settings, color: "#6EE7B7", href: "/admin/settings" },
    {
      name: "Sign Out",
      icon: LogOut,
      color: "#EF4444",
      onClick: handleLogout,
    },
  ];

  const bgClass = isDarkMode
      ? "bg-gray-800 bg-opacity-50 border-gray-700"
      : "bg-white bg-opacity-80 border-gray-300";

  const hoverClass = isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";
  const textClass = isDarkMode ? "text-gray-100" : "text-gray-800";

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
            <Menu size={24} className={textClass} />
          </motion.button>

          <nav className="mt-8 flex-grow">
            {sidebarItems.map((item) =>
                item.href ? (
                    <Link key={item.name} to={item.href}>
                      <motion.div
                          className={`flex items-center p-4 text-sm font-medium rounded-lg ${hoverClass} ${textClass} transition-colors mb-2`}
                      >
                        <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
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
                ) : (
                    <motion.button
                        key={item.name}
                        onClick={item.onClick}
                        className={`w-full text-left flex items-center p-4 text-sm font-medium rounded-lg ${hoverClass} ${textClass} transition-colors mb-2`}
                    >
                      <item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
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
                    </motion.button>
                )
            )}
          </nav>
        </div>
      </motion.div>
  );
};

export default Sidebar;
