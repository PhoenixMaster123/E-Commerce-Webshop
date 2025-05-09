import React, { JSX, useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaGithub, FaSlack, FaFacebook, FaTwitter, FaXing } from "react-icons/fa";
import { Loader2, XCircle, CheckCircle } from "lucide-react";

interface AccountDefinition {
  name: string;
  icon: JSX.Element;
  description: string;
  iconColor?: string;
}

interface ConnectedAccount extends AccountDefinition {
  connectedAt: Date;
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

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
    iconColor: "text-black dark:text-white",
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

const SocialPage: React.FC = () => {
  const [initialConnectedAccounts, setInitialConnectedAccounts] = useState<ConnectedAccount[]>(() => [
    { ...AVAILABLE_ACCOUNTS[0], connectedAt: new Date(Date.now() - 86400000 * 5) },
    { ...AVAILABLE_ACCOUNTS[1], connectedAt: new Date(Date.now() - 86400000 * 2) },
  ]);

  const [connectedAccounts, setConnectedAccounts] = useState<ConnectedAccount[]>(initialConnectedAccounts);
  const [adding, setAdding] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const [disconnectingAccount, setDisconnectingAccount] = useState<string | null>(null);

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
    const currentNames = connectedAccounts.map(acc => acc.name).sort().join(',');
    const initialNames = initialConnectedAccounts.map(acc => acc.name).sort().join(',');
    return currentNames !== initialNames;
  }, [connectedAccounts, initialConnectedAccounts]);

  const handleConnect = useCallback((account: AccountDefinition) => {
    if (connectedAccounts.find((a) => a.name === account.name)) return;

    const newConnectedAccounts = [...connectedAccounts, { ...account, connectedAt: new Date() }];
    setConnectedAccounts(newConnectedAccounts);
    setAdding(false);
    setStatusMessage(`Connected ${account.name}. Don't forget to save!`);
    setStatusType('success');
  }, [connectedAccounts]);

  const handleDisconnect = useCallback((name: string) => {
    if (!isSaving && !disconnectingAccount) {
      setDisconnectingAccount(name);
    }
  }, [isSaving, disconnectingAccount]);

  const confirmDisconnect = useCallback((name: string) => {
    const accountToDisconnect = connectedAccounts.find(acc => acc.name === name);
    const newConnectedAccounts = connectedAccounts.filter((acc) => acc.name !== name);
    setConnectedAccounts(newConnectedAccounts);
    setDisconnectingAccount(null);
    if (accountToDisconnect) {
      setStatusMessage(`Disconnected ${accountToDisconnect.name}. Don't forget to save!`);
      setStatusType('success');
    }
  }, [connectedAccounts]);

  const cancelDisconnect = useCallback(() => {
    setDisconnectingAccount(null);
  }, []);

  const handleSave = useCallback(async () => {
    setIsSaving(true);
    setStatusMessage(null);

    try {
      console.log("Simulating saving changes:", connectedAccounts);
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.1;
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

    } catch (err: any) {
      setIsSaving(false);
      setStatusMessage(err.message || "An unknown error occurred during save.");
      setStatusType('error');
    }
  }, [connectedAccounts]);

  const unconnectedAccounts = useMemo(() => {
    return AVAILABLE_ACCOUNTS.filter(
      (acc) => !connectedAccounts.some((c) => c.name === acc.name)
    );
  }, [connectedAccounts]);

  const isAddButtonDisabled = unconnectedAccounts.length === 0 || adding || isSaving || !!disconnectingAccount;
  const isSaveButtonDisabled = !hasUnsavedChanges || isSaving || !!disconnectingAccount;
  const isDisconnectButtonDisabled = isSaving || !!disconnectingAccount;

  return (
    <div className="container mx-auto px-4 py-8 md:flex md:gap-8">

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
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Confirm Disconnect</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to disconnect your **{disconnectingAccount}** account?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => confirmDisconnect(disconnectingAccount)}
                  className="px-4 py-2 rounded-md font-semibold bg-red-600 text-white hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  Yes, Disconnect
                </button>
                <button
                  onClick={cancelDisconnect}
                  className="px-4 py-2 rounded-md font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400 text-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSaving}
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Connected Accounts
        </h2>

        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 ${
                statusType === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                statusType === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              {statusType === 'success' && <CheckCircle size={18} />}
              {statusType === 'error' && <XCircle size={18} />}
              {statusMessage}
            </motion.div>
          )}
        </AnimatePresence>

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
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-md shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl ${account.iconColor}`}>{account.icon}</div>
                    <div className="flex flex-col">
                      <p className="text-lg font-medium text-gray-900 dark:text-white">{account.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Connected since {formatDate(account.connectedAt)}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    onClick={() => handleDisconnect(account.name)}
                    className={`px-4 py-2 rounded-md font-semibold bg-red-600 text-white text-sm transition-colors
                                      ${isDisconnectButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                    whileTap={{ scale: isDisconnectButtonDisabled ? 1 : 0.95 }}
                    disabled={isDisconnectButtonDisabled}
                  >
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
              className="text-center py-8 text-gray-500 dark:text-gray-400"
            >
              <p>No accounts connected yet.</p>
              <p>Click "Add Account" to get started!</p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6">
          {adding ? (
            <div className="space-y-2">
              {unconnectedAccounts.length === 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-300">All available accounts are connected.</p>
              ) : (
                unconnectedAccounts.map((account) => (
                  <button
                    key={account.name}
                    onClick={() => handleConnect(account)}
                    className="flex items-center gap-3 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 w-full text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isSaving || !!disconnectingAccount}
                  >
                    <div className={`text-2xl ${account.iconColor}`}>{account.icon}</div>
                    <div className="flex flex-col">
                      <span className="font-medium">{account.name}</span>
                      <span className="text-xs text-blue-700 dark:text-blue-300">{account.description}</span>
                    </div>
                  </button>
                ))
              )}
              <button
                onClick={() => setAdding(false)}
                className="mt-2 text-sm text-gray-500 hover:underline dark:text-gray-400 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSaving || !!disconnectingAccount}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAdding(true)}
              className={`mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-colors flex items-center gap-2
                                ${isAddButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              disabled={isAddButtonDisabled}
            >
              {(isSaving || !!disconnectingAccount) && <Loader2 className="animate-spin mr-2" size={20} />}
              Add Account
            </button>
          )}
        </div>

        <div className="mt-8">
          <button
            onClick={handleSave}
            className={`px-6 py-3 bg-green-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
                              ${isSaveButtonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'}`}
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