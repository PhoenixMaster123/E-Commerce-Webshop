import React, {JSX, useState, useEffect, useMemo, useCallback, useContext} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaGithub, FaSlack, FaFacebook, FaTwitter, FaXing } from "react-icons/fa";
import { Loader2, XCircle, CheckCircle, RefreshCcw } from "lucide-react";
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

// --- Interfaces ---
interface AccountDefinition {
  name: string;
  icon: JSX.Element;
  description: string;
  iconColor?: string;
}

interface ConnectedAccount extends AccountDefinition {
  connectedAt: Date;
}

// --- Utility Functions ---
const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

// --- Data ---
const AVAILABLE_ACCOUNTS: AccountDefinition[] = [
  {
    name: "Google",
    icon: <FaGoogle className="w-6 h-6" />,
    description: "Connect your Google account",
    iconColor: "text-red-600",
  },
  {
    name: "GitHub",
    icon: <FaGithub className="w-6 h-6" />,
    description: "Connect your GitHub account",
    iconColor: "text-gray-800 dark:text-white",
  },
  {
    name: "Slack",
    icon: <FaSlack className="w-6 h-6" />,
    description: "Connect your Slack account",
    iconColor: "text-purple-600",
  },
  {
    name: "Facebook",
    icon: <FaFacebook className="w-6 h-6" />,
    description: "Connect your Facebook account",
    iconColor: "text-blue-600",
  },
  {
    name: "Twitter",
    icon: <FaTwitter className="w-6 h-6" />,
    description: "Connect your Twitter account",
    iconColor: "text-blue-400",
  },
  {
    name: "Xing",
    icon: <FaXing className="w-6 h-6" />,
    description: "Connect your Xing account",
    iconColor: "text-green-400",
  },
];

// --- Component ---
const SocialPage: React.FC = () => {
  // --- Theme Management ---
  const { isDarkMode } = useContext(ThemeContext);
  const isDarkTheme = isDarkMode;

  const [initialConnectedAccounts, setInitialConnectedAccounts] = useState<ConnectedAccount[] | null>(null);
  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[] | null>(null);
  const [adding, setAdding] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [disconnectingAccount, setDisconnectingAccount] = useState<string | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoadingInitial(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fetchedSettings: ConnectedAccount[] = [
        { ...AVAILABLE_ACCOUNTS[0], connectedAt: new Date(Date.now() - 86400000 * 5) },
        { ...AVAILABLE_ACCOUNTS[1], connectedAt: new Date(Date.now() - 86400000 * 2) },
      ];
      setInitialConnectedAccounts(fetchedSettings);
      setConnectedAccounts(fetchedSettings);
      setIsLoadingInitial(false);
    };

    fetchSettings();
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (statusMessage) {
      timer = setTimeout(() => {
        setStatusMessage(null);
        setStatusType(null);
      }, 4000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [statusMessage]);

  const hasUnsavedChanges = useMemo(() => {
    if (!connectedAccounts || !initialConnectedAccounts) return false;
    const currentNames = connectedAccounts.map(acc => acc.name).sort().join(',');
    const initialNames = initialConnectedAccounts.map(acc => acc.name).sort().join(',');
    return currentNames !== initialNames;
  }, [connectedAccounts, initialConnectedAccounts]);

  const handleConnect = useCallback(async (account: AccountDefinition) => {
    if (!connectedAccounts || connectedAccounts.find((a) => a.name === account.name) || isLoadingInitial) return;

    setIsSaving(true);
    setStatusMessage(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newConnectedAccounts = [...connectedAccounts, { ...account, connectedAt: new Date() }];
      setConnectedAccounts(newConnectedAccounts);
      setAdding(false);
      setStatusMessage(`Connected ${account.name}. Don't forget to save!`);
      setStatusType('success');
    } catch (error: unknown) {
      let message = `Failed to connect ${account.name}.`;
      if (error instanceof Error) {
          message += ` Reason: ${error.message}`;
       }
      setStatusMessage(message);
      setStatusType('error');
    } finally {
      setIsSaving(false);
    }
  }, [connectedAccounts, isLoadingInitial]);

  const handleDisconnect = useCallback((name: string) => {
    if (!isSaving && !disconnectingAccount && !isLoadingInitial) {
      setDisconnectingAccount(name);
    }
  }, [isSaving, disconnectingAccount, isLoadingInitial]);

  const confirmDisconnect = useCallback(async () => {
    if (!disconnectingAccount || !connectedAccounts || isLoadingInitial) return;

    const accountName = disconnectingAccount;
    setIsSaving(true);
    setDisconnectingAccount(null);
    setStatusMessage(null);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const accountToDisconnectDetails = connectedAccounts.find(acc => acc.name === accountName);
      const newConnectedAccounts = connectedAccounts.filter((acc) => acc.name !== accountName);
      setConnectedAccounts(newConnectedAccounts);
      if (accountToDisconnectDetails) {
        setStatusMessage(`Disconnected ${accountToDisconnectDetails.name}. Don't forget to save!`);
        setStatusType('success');
      }
    } catch (error: unknown) {
      let message = `Failed to disconnect ${accountName}.`;
      if (error instanceof Error) {
        message += ` Reason: ${error.message}`;
      }
      setStatusMessage(message);
      setStatusType('error');
    } finally {
      setIsSaving(false);
    }
  }, [connectedAccounts, disconnectingAccount, isLoadingInitial]);

  const cancelDisconnect = useCallback(() => {
    setDisconnectingAccount(null);
  }, []);

  const handleSave = useCallback(async () => {
    if (!connectedAccounts || isSaving || !hasUnsavedChanges || isLoadingInitial) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      console.log("Simulating saving changes:", connectedAccounts);
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.1; // 90% chance of success
        setTimeout(() => {
          if (success) {
            setInitialConnectedAccounts(connectedAccounts);
            resolve(null);
          } else {
            reject(new Error("Failed to save changes. Please try again."));
          }
        }, 1000);
      });

      setIsSaving(false);
      setStatusMessage("Changes saved successfully!");
      setStatusType('success');

    } catch (error: unknown) {
      setIsSaving(false);
      let errorMessage = "An unknown error occurred during save.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      setStatusMessage(errorMessage);
      setStatusType('error');
    }
  }, [connectedAccounts, hasUnsavedChanges, isSaving, isLoadingInitial]);

  const unconnectedAccounts = useMemo(() => {
    if (!connectedAccounts) return []
    return AVAILABLE_ACCOUNTS.filter(
        (acc) => !connectedAccounts.some((c) => c.name === acc.name)
    );
  }, [connectedAccounts]);

  const isActionDisabled = isSaving || !!disconnectingAccount;
  const isAddButtonDisabled = unconnectedAccounts.length === 0 || adding || isActionDisabled;
  const isSaveButtonDisabled = !hasUnsavedChanges || isActionDisabled;

  if (isLoadingInitial) {
    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center z-50
                        ${isDarkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-gray-200 bg-opacity-90'}`}>
          <RefreshCcw className={`w-12 h-12 animate-spin mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Loading accounts...</p>
        </div>
    );
  }

  if (connectedAccounts === null) {
    return <div className="text-center py-8">Error: Could not load account data.</div>;
  }

  return (
      <div className={`container mx-auto px-4 py-8 md:flex md:gap-8 ${isDarkTheme ? 'text-gray-100' : 'text-gray-900'}`}>

        {/* Disconnect Confirmation Modal */}
        <AnimatePresence>
          {disconnectingAccount && (
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    className={`p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto
                ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`
                    }
                >
                  <h3 className="text-lg font-semibold mb-4">Confirm Disconnect</h3>
                  <p className={`mb-6 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    Are you sure you want to disconnect your **{disconnectingAccount}** account?
                  </p>
                  <div className="flex justify-center gap-4">
                    <button
                        onClick={confirmDisconnect}
                        className="px-4 py-2 rounded-md font-semibold bg-red-600 text-white hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSaving}
                    >
                      Yes, Disconnect
                    </button>
                    <button
                        onClick={cancelDisconnect}
                        className={`px-4 py-2 rounded-md font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed
                    ${isDarkTheme ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`
                        }
                        disabled={isSaving}
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>

        <div className={`flex-1 p-6 rounded-lg shadow-md
        ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`
        }>
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            Connected Accounts
          </h2>

          {/* Status Message Display */}
          <AnimatePresence>
            {statusMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 text-sm
                    absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-lg mx-auto
                ${statusType === 'success' ?
                        (isDarkTheme ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                        statusType === 'error' ?
                            (isDarkTheme ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800') :
                            (isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                    }`}
                >
                  {statusType === 'success' && <CheckCircle size={18} />}
                  {statusType === 'error' && <XCircle size={18} />}
                  {statusMessage}
                </motion.div>
            )}
          </AnimatePresence>

          {/* Connected Accounts List */}
          <AnimatePresence mode="wait">
            {connectedAccounts.length > 0 ? (
                <motion.div key="connected-list" layout className="space-y-4">
                  {connectedAccounts.map((account) => (
                      <motion.div
                          key={account.name}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center justify-between p-4 rounded-md shadow-sm
                    ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-50'}`
                          }
                      >
                        <div className="flex items-center gap-4">
                          <div className={`text-2xl ${account.iconColor}`}>{account.icon}</div>
                          <div className="flex flex-col">
                            <p className={`text-lg font-medium ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{account.name}</p>
                            <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                              Connected since {formatDate(account.connectedAt)}
                            </p>
                          </div>
                        </div>
                        <motion.button
                            onClick={() => handleDisconnect(account.name)}
                            className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors flex items-center justify-center gap-2
                      ${isActionDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700'}`
                            }
                            whileTap={{ scale: isActionDisabled ? 1 : 0.95 }}
                            disabled={isActionDisabled}
                        >
                          {isActionDisabled && disconnectingAccount === account.name && <Loader2 className="animate-spin" size={18} />}
                          Disconnect
                        </motion.button>
                      </motion.div>
                  ))}
                </motion.div>
            ) : (
                <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`text-center py-8 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}
                >
                  <p>No accounts connected yet.</p>
                  <p>Click "Add Account" to get started!</p>
                </motion.div>
            )}
          </AnimatePresence>

          {/* Add Account Section */}
          <div className="mt-6">
            {adding ? (
                <div className="space-y-2">
                  {unconnectedAccounts.length === 0 ? (
                      <p className={`text-sm ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>All available accounts are connected.</p>
                  ) : (
                      unconnectedAccounts.map((account) => (
                          <button
                              key={account.name}
                              onClick={() => handleConnect(account)}
                              className={`flex items-center gap-3 px-4 py-2 rounded-md w-full text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      ${isDarkTheme ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`
                              }
                              disabled={isActionDisabled}
                          >
                            {isActionDisabled && isSaving && <Loader2 className="animate-spin mr-2" size={18} />}
                            <div className={`text-2xl ${account.iconColor}`}>{account.icon}</div>
                            <div className="flex flex-col">
                              <span className="font-medium">{account.name}</span>
                              <span className={`text-xs ${isDarkTheme ? 'text-blue-300' : 'text-blue-700'}`}>{account.description}</span>
                            </div>
                          </button>
                      ))
                  )}
                  <button
                      onClick={() => setAdding(false)}
                      className={`mt-2 text-sm hover:underline disabled:opacity-50 disabled:cursor-not-allowed
                  ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`
                      }
                      disabled={isActionDisabled}
                  >
                    Cancel
                  </button>
                </div>
            ) : (
                <button
                    onClick={() => setAdding(true)}
                    className={`mt-4 px-6 py-3 font-semibold rounded-md transition-colors flex items-center gap-2
                ${isAddButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`
                    }
                    disabled={isAddButtonDisabled}
                >
                  {isActionDisabled && <Loader2 className="animate-spin mr-2" size={20} />}
                  Add Account
                </button>
            )}
          </div>

          {/* Save Changes Button */}
          <div className="mt-8">
            <button
                onClick={handleSave}
                className={`px-6 py-3 bg-green-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
              ${isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`
                }
                disabled={isSaveButtonDisabled}
            >
              {isSaving && <Loader2 className="animate-spin" size={20} />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
  );
};

export default SocialPage;