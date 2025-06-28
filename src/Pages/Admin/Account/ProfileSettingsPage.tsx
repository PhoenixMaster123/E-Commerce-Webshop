import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2, RefreshCcw } from 'lucide-react';
import { useTheme } from 'next-themes';

const ProfileSettingsPage = () => {
  // --- Theme Management ---
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  // --- State Management ---
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successTimeoutId, setSuccessTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoadingInitial(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      setFirstName('Jane');
      setLastName('Doe');
      setEmail('jane.doe@example.com');
      setPhone('+49 789 373 568');
      setCountry('Germany');
      setCity('Berlin');
      setAddress('Berliner Straße 5');
      setZipCode('10115');

      setIsLoadingInitial(false);
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    return () => {
      if (successTimeoutId) {
        clearTimeout(successTimeoutId);
      }
    };
  }, [successTimeoutId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting || isLoadingInitial) return;

    setIsSubmitting(true);
    setShowSuccessMessage(false);

    const formData = { firstName, lastName, email, phone, country, city, address, zipCode };
    console.log('Form Submitted Data:', formData);

    try {
      const isSuccess = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate
          resolve(success);
        }, 1000);
      });

      if (isSuccess) {
        setShowSuccessMessage(true);

        if (successTimeoutId) {
          clearTimeout(successTimeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          setShowSuccessMessage(false);
          setSuccessTimeoutId(null);
        }, 2000);
        setSuccessTimeoutId(newTimeoutId);

      } else {
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingInitial) {
    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center z-50
                        ${isDarkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-gray-200 bg-opacity-90'}`}>
          <RefreshCcw className={`w-12 h-12 animate-spin mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Loading profile data...</p>
        </div>
    );
  }

  return (
      <section className={`flex-1 border rounded-lg p-6 sm:p-8 shadow-md relative
      ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`
      }>
        <AnimatePresence>
          {showSuccessMessage && (
              <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 text-sm absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] lg:w-[calc(100%-4rem)] max-w-lg mx-auto
            ${isDarkTheme ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800'}`
                  }
                  role="alert"
              >
                <CheckCircle size={18} />
                <span className="text-sm">Changes are saved!</span>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Main content of the form */}
        <h2 className={`text-xl font-semibold mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>First Name</label>
              <input
                  type="text" id="firstName" name="firstName" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className={`block w-full rounded-md shadow-sm
              ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="e.g., Jane" required
                  disabled={isSubmitting}
              />
            </div>
            <div>
              <label htmlFor="lastName" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Last Name</label>
              <input
                  type="text" id="lastName" name="lastName" value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className={`block w-full rounded-md shadow-sm
              ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
              focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                  placeholder="e.g., Doe" required
                  disabled={isSubmitting}
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <input
                type="email" id="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`block w-full rounded-md shadow-sm
            ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
            focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                placeholder="e.g., jane.doe@example.com" required
                disabled={isSubmitting}
            />
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Phone Number</label>
            <input
                type="tel" id="phone" name="phone" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`block w-full rounded-md shadow-sm
            ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
            focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                placeholder="e.g., +49 789 373 568"
                disabled={isSubmitting}
            />
          </div>
          {/* Personal Address Section */}
          <div className={`space-y-6 pt-4 border-t ${isDarkTheme ? 'border-gray-600' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-medium leading-6 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Personal Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label htmlFor="country" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Country</label>
                <input
                    type="text" id="country" name="country" value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className={`block w-full rounded-md shadow-sm
                ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    placeholder="e.g., Germany"
                    disabled={isSubmitting}
                />
              </div>
              {/* City */}
              <div>
                <label htmlFor="city" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>City</label>
                <input
                    type="text" id="city" name="city" value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`block w-full rounded-md shadow-sm
                ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    placeholder="e.g., Berlin"
                    disabled={isSubmitting}
                />
              </div>
              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Address</label>
                <input
                    type="text" id="address" name="address" value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`block w-full rounded-md shadow-sm
                ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    placeholder="e.g., Berliner Straße 5"
                    disabled={isSubmitting}
                />
              </div>
              {/* Zip Code */}
              <div>
                <label htmlFor="zipCode" className={`block text-sm font-medium mb-1 ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>Zip Code</label>
                <input
                    type="text" id="zipCode" name="zipCode" value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className={`block w-full rounded-md shadow-sm
                ${isDarkTheme ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white text-gray-900'}
                focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
                    placeholder="e.g., 10115"
                    disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-right">
            <button
                type="submit"
                className={`inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
            ${isDarkTheme ? 'bg-indigo-700 hover:bg-indigo-800 focus:ring-indigo-800' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'}`
                }
                disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin mr-2" size={18} />}
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>
  );
};

export default ProfileSettingsPage;