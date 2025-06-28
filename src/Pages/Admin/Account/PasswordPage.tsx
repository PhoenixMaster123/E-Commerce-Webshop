import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, XCircle, CheckCircle, Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";

const PasswordPage = () => {
  // --- Theme Management ---
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

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
    const strengthColors = ['bg-red-600', 'bg-orange-600', 'bg-yellow-600', 'bg-green-600', 'bg-blue-600'];
    const strengthTextColors = ['text-red-600', 'text-orange-600', 'text-yellow-600', 'text-green-600', 'text-blue-600'];

    const percentage = Math.min((strength / 5) * 100, 100);

    return {
      score: strength,
      label: strengthLabels[strength] || '',
      colorClass: strengthColors[strength] || '',
      textColorClass: strengthTextColors[strength] || '',
      percentage: percentage,
    };
  }, [newPassword]);

  // --- Effect for Initial Settings Fetch ---
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      setIsLoadingInitial(true);
      setStatusError(null);

      // Simulate API call to fetch initial security settings (like 2FA status)
      try {
        const response = await new Promise<{ isTwoFactorEnabled: boolean }>(resolve => {
          setTimeout(() => {
            resolve({ isTwoFactorEnabled: true });
          }, 800);
        });

        setIsTwoFactorEnabled(response.isTwoFactorEnabled);

      } catch (error) {
        console.error("Failed to fetch initial security settings:", error);
      } finally {
        setIsLoadingInitial(false);
      }
    };

    fetchSecuritySettings();
  }, []);

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
    if (isTwoFactorToggling || isPasswordChanging || isLoadingInitial) return;

    setStatusError(null);
    setIsTwoFactorToggling(true);

    console.log(`Attempting to toggle 2FA to ${!isTwoFactorEnabled}`);

    try {
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.15;
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error(`Failed to ${isTwoFactorEnabled ? 'disable' : 'enable'} 2FA status.`));
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
        <section className={`flex-1 rounded-lg p-6 sm:p-8 shadow-md text-center flex items-center justify-center min-h-64
        ${isDarkTheme ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-white text-gray-600 border border-gray-200'}`}>
          <Loader2 className="animate-spin mr-3" size={24} /> Loading security settings...
        </section>
    );
  }

  return (
      // Removed the max-w-3xl and mx-auto from here
      <div className={`flex-1 py-8 px-4 sm:px-6 lg:px-8`}>
        <AnimatePresence>
          {statusMessage && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  // Adjusted positioning for the alert
                  className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 text-sm
                    absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-lg mx-auto
              ${statusType === 'success' ?
                      (isDarkTheme ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                      statusType === 'error' ?
                          (isDarkTheme ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800') :
                          (isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800') // Fallback neutral style
                  }`}
              >
                {statusType === 'success' && <CheckCircle size={18} />}
                {statusType === 'error' && <XCircle size={18} />}
                <span className="text-sm">{statusMessage}</span>
              </motion.div>
          )}
        </AnimatePresence>

        {/* --- Change Password Section --- */}
        <section className={`rounded-lg p-6 sm:p-8 shadow-md relative mb-6
                       ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            {/* Current Password Input */}
            <div>
              <label htmlFor="currentPassword" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Current Password</label>
              <div className="relative">
                <input
                    type={showCurrentPassword ? 'text' : 'password'} id="currentPassword" name="currentPassword"
                    value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
                    className={`block w-full rounded-md shadow-sm pr-10
                         ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                         focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    autoComplete="current-password" required
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                />
                <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                         ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {/* New Password Input */}
            <div>
              <label htmlFor="newPassword" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>New Password</label>
              <div className="relative">
                <input
                    type={showNewPassword ? 'text' : 'password'} id="newPassword" name="newPassword"
                    value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
                    className={`block w-full rounded-md shadow-sm pr-10
                         ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                         focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    autoComplete="new-password" required
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                />
                <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                         ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password Strength Indicator */}
              {newPassword.length > 0 && (
                  <div className="mt-2 w-full">
                    <div className={`w-full rounded-full h-2 ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                          className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.colorClass}`}
                          style={{ width: `${passwordStrength.percentage}%` }}
                      ></div>
                    </div>
                    {/* Password Strength Text */}
                    <p className={`text-xs mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                      Strength: <span className={`font-semibold ${passwordStrength.textColorClass}`}>{passwordStrength.label}</span>
                    </p>
                  </div>
              )}
            </div>
            {/* Confirm New Password Input */}
            <div>
              <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Confirm New Password</label>
              <div className="relative">
                <input
                    type={showConfirmPassword ? 'text' : 'password'} id="confirmPassword" name="confirmPassword"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`block w-full rounded-md shadow-sm pr-10
                         ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                         focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    autoComplete="new-password" required
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed
                         ${isDarkTheme ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'}`}
                    disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 text-right">
              <button
                  type="submit"
                  className={`inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed
                         ${isDarkTheme ? 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}
                         ${isPasswordChanging ? 'pl-4 pr-6' : ''}`}
                  disabled={isPasswordChanging || isTwoFactorToggling || isLoadingInitial} // Disable while loading
              >
                {isPasswordChanging && <Loader2 className="animate-spin mr-2" size={20} />}
                {isPasswordChanging ? 'Changing...' : 'Change Password'}
              </button>
            </div>
          </form>
        </section>

        {/* --- Security Settings Section --- */}
        <section className={`rounded-lg p-6 sm:p-8 shadow-md relative
                       ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className={`text-xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Security Settings</h2>
          <div className="space-y-4">
            {/* Two-Factor Authentication Toggle */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className={`text-lg font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Two-Factor Authentication (2FA)</h3>
                <p className={`mt-1 text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                  {isTwoFactorEnabled
                      ? "2FA is currently enabled, adding an extra layer of security."
                      : "Enable 2FA to better protect your account from unauthorized access."}
                </p>
              </div>
              <button
                  type="button" onClick={handleToggleTwoFactor}
                  className={`inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed ${
                      isTwoFactorToggling ? '' :
                          (isTwoFactorEnabled
                              ? (isDarkTheme ? 'bg-red-700 hover:bg-red-800 focus:ring-red-800' : 'bg-red-600 hover:bg-red-700 focus:ring-red-500') // Red for Disable
                              : (isDarkTheme ? 'bg-green-700 hover:bg-green-800 focus:ring-green-800' : 'bg-green-600 hover:bg-green-700 focus:ring-green-500')) // Green for Enable
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