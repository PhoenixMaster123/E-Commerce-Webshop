import { useState } from "react";
import { useTheme } from "next-themes";
import SettingSection from "./SettingSection";
import { HelpCircle, Plus } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGoogle, faFacebook, faXTwitter, IconDefinition} from "@fortawesome/free-brands-svg-icons";

interface Account {
  id: number;
  name: string;
  connected: boolean;
  icon: IconDefinition;
  colorKey: string;
}

const getDynamicIconColor = (colorKey: string, currentTheme: string): string => {
  const colorMap: { [key: string]: { light: string; dark: string } } = {
    "google": { light: "#DB4437", dark: "#DB4437" },
    "facebook": { light: "#1DA1F2", dark: "#4267B2" },
    "x": { light: "#000000", dark: "#1DA1F2" },
  };

  const colors = colorMap[colorKey];

  if (!colors) {
    console.warn(`No theme colors defined for colorKey: ${colorKey}`);
    return currentTheme === 'dark' ? '#ffffff' : '#000000';
  }

  return currentTheme === "dark" ? colors.dark : colors.light;
};


const ConnectedAccounts = () => {
  const { theme } = useTheme();
  const currentTheme = theme === "dark" || theme === "light" || theme === "system"
      ? theme : "light";

  const [connectedAccounts, setConnectedAccounts] = useState<Account[]>([
    {
      id: 1,
      name: "Google",
      connected: true,
      icon: faGoogle,
      colorKey: "google",
    },
    {
      id: 2,
      name: "Facebook",
      connected: false,
      icon: faFacebook,
      colorKey: "facebook",
    },
    {
      id: 3,
      name: "X",
      connected: true,
      icon: faXTwitter,
      colorKey: "x",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);


  const toggleAccountConnection = (accountId: number) => {
    setConnectedAccounts(
        connectedAccounts.map((acc) =>
            acc.id === accountId ? { ...acc, connected: !acc.connected } : acc
        )
    );
  };

  const addNewAccount = (accountName: string, accountIcon: IconDefinition, colorKey: string) => {
    const newAccount: Account = {
      id: connectedAccounts.length + 1,
      name: accountName,
      connected: false,
      icon: accountIcon,
      colorKey: colorKey,
    };
    setConnectedAccounts([...connectedAccounts, newAccount]);
    setShowAddModal(false);
  };

  const deleteAccount = () => {
    if (accountToDelete !== null) {
      setConnectedAccounts(connectedAccounts.filter(acc => acc.id !== accountToDelete));
      setShowDeleteModal(false);
      setAccountToDelete(null);
    }
  };

  return (
      <SettingSection icon={HelpCircle} title={"Connected Accounts"} theme={currentTheme}>
        {connectedAccounts.map((account) => {
          const iconColor = getDynamicIconColor(account.colorKey, currentTheme);

          return (
              <div key={account.id} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon
                      icon={account.icon}
                      className={`w-5 h-5 mr-1 transition duration-200 ${account.connected ? "opacity-100" : "opacity-50"}`}
                      style={{ color: iconColor }}
                  />
                  <span className="text-gray-900 dark:text-gray-300">{account.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                      className={`
                  px-3 py-1 rounded text-sm transition duration-200 text-white
                  ${account.connected
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                      }
                `}
                      onClick={() => toggleAccountConnection(account.id)}
                  >
                    {account.connected ? "Connected" : "Connect"}
                  </button>
                  <button
                      className="px-3 py-1 rounded text-sm bg-red-600 hover:bg-red-700 text-white transition duration-200"
                      onClick={() => {
                        setAccountToDelete(account.id);
                        setShowDeleteModal(true);
                      }}
                  >
                    Delete
                  </button>
                </div>
              </div>
          );
        })}
        <button
            className="mt-4 flex items-center text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition duration-200"
            onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} className="mr-2" /> Add Account
        </button>

        {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="rounded-lg p-6 w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-4">Add New Account</h3>
                <div>
                  <button
                      className="w-full px-4 py-2 mb-2 text-white bg-blue-500 hover:bg-blue-600 rounded"
                      onClick={() => addNewAccount("Google", faGoogle, "google")}
                  >
                    Add Google
                  </button>
                  <button
                      className="w-full px-4 py-2 mb-2 text-white bg-blue-700 hover:bg-blue-800 rounded"
                      onClick={() => addNewAccount("Facebook", faFacebook, "facebook")}
                  >
                    Add Facebook
                  </button>
                  <button
                      className="w-full px-4 py-2 mb-2 text-white bg-blue-400 hover:bg-blue-500 rounded"
                      onClick={() => addNewAccount("X", faXTwitter, "x")}
                  >
                    Add X
                  </button>
                </div>
                <button
                    className="mt-4 w-full px-4 py-2 border rounded hover:bg-gray-100 text-gray-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
        )}

        {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="rounded-lg p-6 w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to delete this account?</p>
                <div className="flex gap-4">
                  <button
                      className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
                      onClick={deleteAccount}
                  >
                    Delete
                  </button>
                  <button
                      className="w-full px-4 py-2 border rounded hover:bg-gray-100 text-gray-500 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
                      onClick={() => setShowDeleteModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
        )}
      </SettingSection>
  );
};

export default ConnectedAccounts;