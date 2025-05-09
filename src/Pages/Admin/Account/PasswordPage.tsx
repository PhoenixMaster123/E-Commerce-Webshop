import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, XCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

const PasswordPage = () => {
  // --- Password Change State ---
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- Show Password State ---
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  // --- Security Settings State ---
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false); // Default/fallback state

  // --- Loading States ---
  const [isLoadingInitial, setIsLoadingInitial] = useState(true); // Added initial loading state
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);
  const [isTwoFactorToggling, setIsTwoFactorToggling] = useState(false);


  // --- Status Messages ---
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);

  // --- Password Strength ---
  const passwordStrength = useMemo(() => {
    let strength = 0;
    if (newPassword.length > 7) strength += 1;
    if (newPassword.match(/[a-z]/)) strength += 1;
    if (newPassword.match(/[A-Z]/)) strength += 1;
    if (newPassword.match(/[0-9]/)) strength += 1;
    if (newPassword.match(/[^A-Za-z0-9]/)) strength += 1;

    const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'];
    const percentage = Math.min((strength / 5) * 100, 100);

    return {
      score: strength,
      label: strengthLabels[strength] || '',
      colorClass: strengthColors[strength] || '',
      percentage: percentage,
    };
  }, [newPassword]);


  // --- Effect for Initial Settings Fetch ---
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      setIsLoadingInitial(true);
      setStatusError(null); // Clear any previous status messages on load start

      // Simulate API call to fetch initial security settings (like 2FA status)
      try {
        const response = await new Promise<{ isTwoFactorEnabled: boolean }>(resolve => {
          setTimeout(() => {
            // Simulate fetching a value from the backend
            resolve({ isTwoFactorEnabled: true }); // Example: Fetched 2FA is initially enabled
          }, 800); // Simulate network delay
        });

        setIsTwoFactorEnabled(response.isTwoFactorEnabled);

      } catch (error) {
        console.error("Failed to fetch initial security settings:", error);
        // Optionally set an error status message here if fetching fails critically
        // setStatusError("Failed to load security settings.");
      } finally {
        setIsLoadingInitial(false); // Always stop initial loading
      }
    };

    fetchSecuritySettings();
  }, []); // Empty dependency array means this runs once on mount


  // --- Effect for clearing Status Message Timeout ---
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


  // --- Handlers ---

  const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Prevent action if loading or another action is in progress
    if (isPasswordChanging || isTwoFactorToggling || isLoadingInitial) return;

    setStatusError(null);
    setIsPasswordChanging(true);

    // Basic client-side validation
    if (newPassword !== confirmPassword) {
      setStatusMessage("New passwords do not match.");
      setStatusType('error');
      setIsPasswordChanging(false);
      return;
    }
    if (newPassword.length < 8) {
      setStatusMessage("New password must be at least 8 characters long.");
      setStatusType('error');
      setIsPasswordChanging(false);
      return;
    }
    if (!currentPassword) {
      setStatusMessage("Current password is required.");
      setStatusType('error');
      setIsPasswordChanging(false);
      return;
    }

    console.log('Password Change Attempt:', { currentPassword, newPassword });

    try {
      await new Promise((resolve, reject) => {
        const isCurrentPasswordCorrect = currentPassword === 'correctCurrentPassword123!';
        const isApiSuccess = isCurrentPasswordCorrect && Math.random() > 0.1;

        setTimeout(() => {
          if (isApiSuccess) {
            resolve(null);
          } else if (!isCurrentPasswordCorrect) {
            reject(new Error("Incorrect current password."));
          }
          else {
            reject(new Error("Failed to change password. Please try again."));
          }
        }, 1500);
      });

      setStatusMessage("Password changed successfully!");
      setStatusType('success');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);

    } catch (err: any) {
      setStatusMessage(err.message || "An unknown error occurred during password change.");
      setStatusType('error');
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handleToggleTwoFactor = async () => {
    // Prevent action if loading or another action is in progress
    if (isTwoFactorToggling || isPasswordChanging || isLoadingInitial) return;

    setStatusError(null);
    setIsTwoFactorToggling(true);

    console.log(`Attempting to toggle 2FA to ${!isTwoFactorEnabled}`);

    try {
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.1;
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error("Failed to toggle 2FA status."));
          }
        }, 1000);
      });

      setIsTwoFactorEnabled(!isTwoFactorEnabled);
      setStatusMessage(`Two-Factor Authentication ${isTwoFactorEnabled ? 'disabled' : 'enabled'} successfully.`);
      setStatusType('success');

    } catch (err: any) {
      setStatusMessage(err.message || "An unknown error occurred while toggling 2FA.");
      setStatusType('error');
    } finally {
      setIsTwoFactorToggling(false);
    }
  };

  const setStatusError = (errorMsg: string | null) => {
    setStatusMessage(errorMsg);
    setStatusType(errorMsg ? 'error' : null);
  }

  // --- Render Loading State ---
  if (isLoadingInitial) {
    return (
      <div className="space-y-6 max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-600 dark:text-gray-300 flex items-center justify-center min-h-64">
          <Loader2 className="animate-spin mr-3" size={24} /> Loading security settings...
        </div>
      </div>
    );
  }


  return (
    <div className="space-y-6 max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

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
            <span className="text-sm">{statusMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>


      <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-md relative">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Change Password</h2>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'} id="currentPassword" name="currentPassword"
                value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                autoComplete="current-password" required
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              >
                {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'} id="newPassword" name="newPassword"
                value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                autoComplete="new-password" required
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {newPassword.length > 0 && (
              <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.colorClass}`}
                  style={{ width: `${passwordStrength.percentage}%` }}
                ></div>
                <p className={`text-xs mt-1 text-gray-600 dark:text-gray-400`}>
                  Strength: <span className={`font-semibold ${passwordStrength.colorClass.replace('bg-', 'text-')}`}>{passwordStrength.label}</span>
                </p>
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"
                value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pr-10"
                autoComplete="new-password" required
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 dark:text-gray-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed" // Added disabled styles
                disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-2 text-right">
            <button
              type="submit"
              className={`inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${isPasswordChanging ? 'pl-4 pr-6' : ''}`}
              disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
            >
              {isPasswordChanging && <Loader2 className="animate-spin mr-2" size={20} />}
              {isPasswordChanging ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </section>

      {/* --- Security Settings Section --- */}
      <section className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-md relative">
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Security Settings</h2>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {isTwoFactorEnabled
                  ? "2FA is currently enabled, adding an extra layer of security."
                  : "Enable 2FA to better protect your account from unauthorized access."}
              </p>
            </div>
            <button
              type="button" onClick={handleToggleTwoFactor}
              className={`inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${
                isTwoFactorToggling ? '' :
                (isTwoFactorEnabled
                  ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white'
                  : 'bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white')
              }`}
              disabled={isTwoFactorToggling || isPasswordChanging || isLoadingInitial} // Disable while loading
            >
              {isTwoFactorToggling && <Loader2 className="animate-spin mr-2" size={20} />}
              {isTwoFactorToggling ? (isTwoFactorEnabled ? 'Disabling...' : 'Enabling...') : (isTwoFactorEnabled ? 'Disable 2FA' : 'Enable 2FA')}
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default PasswordPage;