// src/pages/NotificationSettings.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes"; // Assuming next-themes is installed
import { Loader2, XCircle, CheckCircle } from "lucide-react";

// --- NotificationToggle Component ---
interface NotificationToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ label, description, enabled, onToggle, disabled }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const labelColor = useMemo(() => {
    if (disabled) return isDarkTheme ? "text-gray-600" : "text-gray-400";
    return isDarkTheme ? "text-gray-300" : "text-gray-800"; // Always dark text in light mode, lighter in dark mode when enabled
  }, [isDarkTheme, disabled]);

  const descriptionColor = isDarkTheme ? "text-gray-400" : "text-gray-500";

  return (
      <div className={`flex items-center justify-between py-3 border-b
      ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}
      ${disabled ? 'opacity-60' : ''}`
      }>
        <div className="flex-1 pr-4">
          <span className={`text-base font-medium ${labelColor}`}>{label}</span> {/* Added font-medium */}
          {description && (
              <p className={`text-sm mt-1 ${descriptionColor}`}>{description}</p>
          )}
        </div>
        <button
            className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
          ${enabled ? "bg-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-700 dark:focus:ring-offset-gray-800" : "bg-gray-400 dark:bg-gray-700 focus:ring-gray-400 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800"}
          ${disabled ? "cursor-not-allowed" : ""}
        `}
            onClick={onToggle}
            role="switch"
            aria-checked={enabled}
            disabled={disabled}
        >
          <motion.span
              layout
              className={`
            inline-block size-4 bg-white rounded-full shadow-lg transform transition-transform
            ${enabled ? "translate-x-6" : "translate-x-1"}
          `}
          />
        </button>
      </div>
  );
};

// --- Interfaces for Notification Settings ---
interface NotificationSettingsState {
  push: {
    enabled: boolean;
    newMessage: boolean;
    activity: boolean;
    promotional: boolean;
  };
  email: {
    enabled: boolean;
    newMessage: boolean;
    summary: boolean;
    marketing: boolean;
  };
  sms: {
    enabled: boolean;
    securityCodes: boolean;
    urgentAlerts: boolean;
  };
}

type NotificationType = 'push' | 'email' | 'sms';
// Using template literal types to correctly infer keys for sub-objects
type PushSettingKey = Exclude<keyof NotificationSettingsState['push'], 'enabled'>;
type EmailSettingKey = Exclude<keyof NotificationSettingsState['email'], 'enabled'>;
type SmsSettingKey = Exclude<keyof NotificationSettingsState['sms'], 'enabled'>;

type SpecificNotificationSettingKey = PushSettingKey | EmailSettingKey | SmsSettingKey;


// --- NotificationPage Component ---
const NotificationPage: React.FC = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const [initialSettings, setInitialSettings] = useState<NotificationSettingsState | null>(null);
  const [settings, setSettings] = useState<NotificationSettingsState | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);


  // Effect to fetch initial settings
  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoadingInitial(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      const fetchedSettings: NotificationSettingsState = {
        push: {
          enabled: true,
          newMessage: true,
          activity: true,
          promotional: false,
        },
        email: {
          enabled: true,
          newMessage: true,
          summary: false,
          marketing: true,
        },
        sms: {
          enabled: false,
          securityCodes: true,
          urgentAlerts: true,
        },
      };
      setInitialSettings(fetchedSettings);
      setSettings(fetchedSettings);
      setIsLoadingInitial(false);
    };

    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount


  // Effect for clearing status message timeout
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (statusMessage) {
      timer = setTimeout(() => {
        setStatusMessage(null);
        setStatusType(null);
      }, 4000); // Message disappears after 4 seconds
    }
    return () => {
      if (timer) clearTimeout(timer); // Cleanup on unmount or if message changes
    };
  }, [statusMessage]);


  // Memoized value to check for unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);


  // Callback for toggling individual sub-settings (e.g., new messages for push)
  const handleToggle = useCallback((type: NotificationType, key: SpecificNotificationSettingKey) => {
    if (!settings) return; // Should not happen given the loading state

    setSettings(prevSettings => {
      if (!prevSettings) return null; // Defensive check

      // Ensure type safety when accessing nested properties
      const currentTypeSettings = prevSettings[type] as { [k: string]: boolean };

      return {
        ...prevSettings,
        [type]: {
          ...currentTypeSettings,
          [key]: !currentTypeSettings[key], // Toggle the specific sub-setting
        },
      };
    });
  }, [settings]); // Depend on settings to ensure latest state is used in callback


  // Callback for toggling the main category (e.g., enable/disable all push notifications)
  const handleMainToggle = useCallback((type: NotificationType) => {
    if (!settings) return; // Should not happen

    setSettings(prevSettings => {
      if (!prevSettings) return null; // Defensive check

      const newEnabledState = !prevSettings[type].enabled;
      // When main toggle is disabled, also disable all sub-toggles
      const updatedSubSettings = { ...prevSettings[type] };
      if (!newEnabledState) {
        // Disable all sub-settings if the main category is being disabled
        for (const subKey in updatedSubSettings) {
          if (subKey !== 'enabled') {
            (updatedSubSettings as any)[subKey] = false;
          }
        }
      }

      return {
        ...prevSettings,
        [type]: {
          ...updatedSubSettings, // Use updatedSubSettings to propagate disabled state
          enabled: newEnabledState,
        },
      };
    });
  }, [settings]); // Depend on settings for latest state


  // Callback for saving settings to a backend (simulated)
  const handleSave = useCallback(async () => {
    if (!settings || isSaving || !hasUnsavedChanges) return; // Disable if no changes or already saving

    setIsSaving(true);
    setStatusMessage(null); // Clear previous status messages before saving

    try {
      console.log("Simulating saving notification settings:", settings);
      // Simulate API call delay and success/failure
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.1; // 90% chance of success
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error("Failed to save settings. Please try again."));
          }
        }, 1000); // 1 second delay
      });

      setIsSaving(false);
      setInitialSettings(settings); // Update initial settings to match saved settings
      setStatusMessage("Settings saved successfully!");
      setStatusType('success');

    } catch (err: any) {
      setIsSaving(false);
      setStatusMessage(err.message || "An unknown error occurred during save.");
      setStatusType('error');
    }
  }, [settings, hasUnsavedChanges, isSaving]); // Dependencies for useCallback


  // --- Render Loading State ---
  if (isLoadingInitial || settings === null) {
    return (
        <div className={`container mx-auto px-6 py-8 md:flex md:gap-8
        ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`
        }>
          <div className={`flex-1 p-6 rounded-lg shadow-md text-center flex items-center justify-center min-h-64
          ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`
          }>
            <Loader2 className="animate-spin mr-3" size={24} /> Loading settings...
          </div>
        </div>
    );
  }

  // --- Main Component Render ---
  return (
      <div className={`container mx-auto px-6 py-8 md:flex md:gap-8`}>
        <div className={`flex-1 p-6 rounded-lg shadow-md
        ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`
        }>
          <h2 className={`text-2xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Notification Settings</h2>

          {/* Status Message Display */}
          <AnimatePresence>
            {statusMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 text-sm
                ${statusType === 'success' ?
                        (isDarkTheme ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                        statusType === 'error' ?
                            (isDarkTheme ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800') :
                            (isDarkTheme ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800') // Fallback neutral style
                    }`}
                >
                  {statusType === 'success' && <CheckCircle size={18} />}
                  {statusType === 'error' && <XCircle size={18} />}
                  {statusMessage}
                </motion.div>
            )}
          </AnimatePresence>

          {/* --- Push Notifications Section --- */}
          <div className="mb-8">
            <h3 className={`text-xl font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Push Notifications</h3>
            <NotificationToggle
                label="Enable Push Notifications"
                description="Receive notifications directly in your browser or app."
                enabled={settings.push.enabled}
                onToggle={() => handleMainToggle('push')}
                disabled={isSaving}
            />
            <AnimatePresence>
              {settings.push.enabled && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-2 space-y-2 overflow-hidden"
                  >
                    <NotificationToggle
                        label="New Messages"
                        description="Get notified when you receive new messages."
                        enabled={settings.push.newMessage}
                        onToggle={() => handleToggle('push', 'newMessage')}
                        disabled={!settings.push.enabled || isSaving}
                    />
                    <NotificationToggle
                        label="Activity on Your Posts"
                        description="Receive alerts for likes, comments, and shares."
                        enabled={settings.push.activity}
                        onToggle={() => handleToggle('push', 'activity')}
                        disabled={!settings.push.enabled || isSaving}
                    />
                    <NotificationToggle
                        label="Promotional Notifications"
                        description="Occasional updates about new features and offers."
                        enabled={settings.push.promotional}
                        onToggle={() => handleToggle('push', 'promotional')}
                        disabled={!settings.push.enabled || isSaving}
                    />
                  </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* --- Email Notifications Section --- */}
          <div className="mb-8">
            <h3 className={`text-xl font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Email Notifications</h3>
            <NotificationToggle
                label="Enable Email Notifications"
                description="Receive notifications via email."
                enabled={settings.email.enabled}
                onToggle={() => handleMainToggle('email')}
                disabled={isSaving}
            />
            <AnimatePresence>
              {settings.email.enabled && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-2 space-y-2 overflow-hidden"
                  >
                    <NotificationToggle
                        label="New Messages"
                        description="Get notified via email when you receive new messages."
                        enabled={settings.email.newMessage}
                        onToggle={() => handleToggle('email', 'newMessage')}
                        disabled={!settings.email.enabled || isSaving}
                    />
                    <NotificationToggle
                        label="Summary Emails"
                        description="Receive a daily or weekly summary of activity."
                        enabled={settings.email.summary}
                        onToggle={() => handleToggle('email', 'summary')}
                        disabled={!settings.email.enabled || isSaving}
                    />
                    <NotificationToggle
                        label="Marketing & Updates"
                        description="Stay informed about product news, tips, and special offers."
                        enabled={settings.email.marketing}
                        onToggle={() => handleToggle('email', 'marketing')}
                        disabled={!settings.email.enabled || isSaving}
                    />
                  </motion.div>
              )}
            </AnimatePresence>
            <p className={`text-sm mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Notifications are sent to: <span className="font-semibold">user@example.com</span>
            </p>
          </div>

          {/* --- SMS Notifications Section --- */}
          <div className="mb-8">
            <h3 className={`text-xl font-medium mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>SMS Notifications</h3>
            <NotificationToggle
                label="Enable SMS Notifications"
                description="Receive notifications via SMS."
                enabled={settings.sms.enabled}
                onToggle={() => handleMainToggle('sms')}
                disabled={isSaving}
            />
            <AnimatePresence>
              {settings.sms.enabled && (
                  <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-2 space-y-2 overflow-hidden"
                  >
                    <NotificationToggle
                        label="Account Security Codes"
                        description="Receive codes for logging in or changing sensitive settings."
                        enabled={settings.sms.securityCodes}
                        onToggle={() => handleToggle('sms', 'securityCodes')}
                        disabled={!settings.sms.enabled || isSaving}
                    />
                    <NotificationToggle
                        label="Urgent Alerts"
                        description="Important system alerts regarding your account security or service status."
                        enabled={settings.sms.urgentAlerts}
                        onToggle={() => handleToggle('sms', 'urgentAlerts')}
                        disabled={!settings.sms.enabled || isSaving}
                    />
                  </motion.div>
              )}
            </AnimatePresence>
            <p className={`text-sm mt-2 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
              Notifications are sent to: <span className="font-semibold">+1 234 567 890</span>
            </p>
            <p className={`text-sm mt-1 italic ${isDarkTheme ? 'text-gray-500' : 'text-gray-600'}`}>
              Standard messaging rates may apply.
            </p>
          </div>

          {/* --- Save Button --- */}
          <div className="mt-6">
            <button
                onClick={handleSave}
                className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
              ${!hasUnsavedChanges || isSaving || isLoadingInitial ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`
                }
                disabled={!hasUnsavedChanges || isSaving || isLoadingInitial}
            >
              {isSaving && <Loader2 className="animate-spin mr-2" size={20} />}
              Save Settings
            </button>
          </div>
        </div>
      </div>
  );
};

export default NotificationPage;