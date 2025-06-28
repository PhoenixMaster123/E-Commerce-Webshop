import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader2 } from 'lucide-react';
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

  // State for the success message visibility
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // State to store the timeout ID for success message
  const [successTimeoutId, setSuccessTimeoutId] = useState<NodeJS.Timeout | null>(null);
  // State for submission loading
  const [isSubmitting, setIsSubmitting] = useState(false);
  // NEW: State for initial page loading
  const [isLoadingInitial, setIsLoadingInitial] = useState(true); // Set to true initially

  // --- Effect for initial data fetch ---
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoadingInitial(true);
      // Simulate API call to fetch existing profile data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate 800ms fetch time

      // Populate form fields with simulated fetched data
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
  }, []); // Empty dependency array means this runs once on mount

  // --- Effect for clearing Success Message Timeout ---
  useEffect(() => {
    return () => {
      if (successTimeoutId) {
        clearTimeout(successTimeoutId);
      }
    };
  }, [successTimeoutId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true); // Set submitting state to true
    setShowSuccessMessage(false); // Hide any previous success messages

    // --- Handle form submission logic here ---
    const formData = { firstName, lastName, email, phone, country, city, address, zipCode };
    console.log('Form Submitted Data:', formData);

    try {
      // Simulate API call and success/failure
      const isSuccess = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          const success = Math.random() > 0.1; // 90% success rate
          resolve(success);
        }, 1000); // Simulate 1 second API delay
      });

      if (isSuccess) {
        // In a real application, you might not clear fields but rather re-fetch or confirm save
        // For demonstration, we'll keep the fields as they were just saved.
        // setFirstName('');
        // setLastName('');
        // setEmail('');
        // setPhone('');
        // setCountry('');
        // setCity('');
        // setAddress('');
        // setZipCode('');
        console.log('Form fields retained after save');

        setShowSuccessMessage(true);

        if (successTimeoutId) {
          clearTimeout(successTimeoutId);
        }

        const newTimeoutId = setTimeout(() => {
          setShowSuccessMessage(false);
          setSuccessTimeoutId(null);
        }, 2000); // Message disappears after 2 seconds
        setSuccessTimeoutId(newTimeoutId);

      } else {
        console.error("Form submission failed");
        // You could add an error message state here similar to the PasswordPage
      }
    } catch (error) {
      console.error("An error occurred during form submission:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // --- Render Loading State ---
  if (isLoadingInitial) {
    return (
        <section className={`flex-1 border rounded-lg p-6 sm:p-8 shadow-md relative
        ${isDarkTheme ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
        flex items-center justify-center min-h-64`} // Added min-h-64 for better loader display
        >
          <Loader2 className="animate-spin mr-3" size={24} />
          <span className={`${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>Loading profile data...</span>
        </section>
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
                  className={`mb-4 px-4 py-3 rounded-md flex items-center gap-2 text-sm absolute top-4 left-1/2 -translate-x-1/2 z-10
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
                  disabled={isSubmitting} // Disable while submitting
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
                  disabled={isSubmitting} // Disable while submitting
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
                disabled={isSubmitting} // Disable while submitting
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
                disabled={isSubmitting} // Disable while submitting
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
                    disabled={isSubmitting} // Disable while submitting
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
                    disabled={isSubmitting} // Disable while submitting
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
                    disabled={isSubmitting} // Disable while submitting
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
                    disabled={isSubmitting} // Disable while submitting
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
                disabled={isSubmitting} // Disable the button when submitting
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