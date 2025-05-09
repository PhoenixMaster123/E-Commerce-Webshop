// src/pages/NotificationSettings.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Loader2, XCircle, CheckCircle } from "lucide-react";

interface NotificationToggleProps {
  label: string;
  description?: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const NotificationToggle: React.FC<NotificationToggleProps> = ({ label, description, enabled, onToggle, disabled }) => {
  const { theme } = useTheme();

  const labelColor = useMemo(() => {
    if (disabled) return theme === "dark" ? "text-gray-600" : "text-gray-400";
    return theme === "dark" ? "text-gray-300" : enabled ? "text-gray-800" : "text-gray-600";
  }, [theme, enabled, disabled]);

  const descriptionColor = theme === "dark" ? "text-gray-500" : "text-gray-500";

  return (
    <div className={`flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 ${disabled ? 'opacity-60' : ''}`}>
      <div className="flex-1 pr-4">
        <span className={`text-base ${labelColor}`}>{label}</span>
        {description && (
          <p className={`text-sm mt-1 ${descriptionColor}`}>{description}</p>
        )}
      </div>
      <button
        className={`
          relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none
          ${enabled ? "bg-indigo-600" : "bg-gray-600 dark:bg-gray-700"}
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
            ${enabled ? "translate-x-6": "translate-x-1"}
          `}
        />
      </button>
    </div>
  );
};

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
type PushSettingKey = keyof NotificationSettingsState['push'];
type EmailSettingKey = keyof NotificationSettingsState['email'];
type SmsSettingKey = keyof NotificationSettingsState['sms'];
type NotificationSettingKey = PushSettingKey | EmailSettingKey | SmsSettingKey;


const NotificationPage: React.FC = () => {
  const [initialSettings, setInitialSettings] = useState<NotificationSettingsState | null>(null);
  const [settings, setSettings] = useState<NotificationSettingsState | null>(null);
  const [isLoadingInitial, setIsLoadingInitial] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);


  useEffect(() => {
    const fetchSettings = async () => {
      setIsLoadingInitial(true);
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
    if (!settings || !initialSettings) return false;
    return JSON.stringify(settings) !== JSON.stringify(initialSettings);
  }, [settings, initialSettings]);


  const handleToggle = useCallback((type: NotificationType, key: NotificationSettingKey) => {
    if (!settings) return;

    setSettings(prevSettings => {
      if (!prevSettings) return null;

      const currentTypeSettings = prevSettings[type] as any;
      if (key in currentTypeSettings) {
        return {
          ...prevSettings,
          [type]: {
            ...currentTypeSettings,
            [key]: !currentTypeSettings[key],
          },
        };
      }
      return prevSettings;
    });
  }, [settings]);


  const handleMainToggle = useCallback((type: NotificationType) => {
    if (!settings) return;

    setSettings(prevSettings => {
      if (!prevSettings) return null;

      const newEnabledState = !prevSettings[type].enabled;
      return {
        ...prevSettings,
        [type]: {
          ...prevSettings[type],
          enabled: newEnabledState,
        },
      };
    });
  }, [settings]);


  const handleSave = useCallback(async () => {
    if (!settings || isSaving || !hasUnsavedChanges) return;

    setIsSaving(true);
    setStatusMessage(null);

    try {
      console.log("Simulating saving notification settings:", settings);
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.1;
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error("Failed to save settings. Please try again."));
          }
        }, 1000);
      });

      setIsSaving(false);
      setInitialSettings(settings);
      setStatusMessage("Settings saved successfully!");
      setStatusType('success');

    } catch (err: any) {
      setIsSaving(false);
      setStatusMessage(err.message || "An unknown error occurred during save.");
      setStatusType('error');
    }
  }, [settings, hasUnsavedChanges, isSaving]);


  if (isLoadingInitial || settings === null) {
    return (
      <div className="container mx-auto px-6 py-8 md:flex md:gap-8">
        <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-600 dark:text-gray-300 flex items-center justify-center min-h-64">
          <Loader2 className="animate-spin mr-3" size={24} /> Loading settings...
        </div>
      </div>
    );
  }


  return (
    <div className="container mx-auto px-6 py-8 md:flex md:gap-8">
      <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Notification Settings</h2>

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


        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Push Notifications</h3>
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

        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Email Notifications</h3>
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Notifications are sent to: <span className="font-semibold">user@example.com</span>
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-4">SMS Notifications</h3>
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
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Notifications are sent to: <span className="font-semibold">+1 234 567 890</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 italic">
            Standard messaging rates may apply.
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className={`px-6 py-3 bg-blue-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
                              ${!hasUnsavedChanges || isSaving || isLoadingInitial ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
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