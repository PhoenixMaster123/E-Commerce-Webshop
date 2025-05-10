import React, { useState, useEffect } from 'react';
const ProfileSettingsPage = () => {
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
  // State to store the timeout ID
  const [successTimeoutId, setSuccessTimeoutId] = useState<NodeJS.Timeout | null>(null);
  // --- End State Management ---

  useEffect(() => {
    return () => {
      if (successTimeoutId) {
        clearTimeout(successTimeoutId);
      }
    };
  }, [successTimeoutId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // --- Handle form submission logic here ---
    const formData = { firstName, lastName, email, phone, country, city, address, zipCode };
    console.log('Form Submitted Data:', formData);
    const isSuccess = true;
    // --- End form submission logic ---

    if (isSuccess) {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setCountry('');
      setCity('');
      setAddress('');
      setZipCode('');
      console.log('Form fields reset');

      setShowSuccessMessage(true);

      if (successTimeoutId) {
        clearTimeout(successTimeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        setShowSuccessMessage(false);
        setSuccessTimeoutId(null);
      }, 2000);
      setSuccessTimeoutId(newTimeoutId);
      // --- End Success Message Logic ---

    } else {
      console.error("Form submission failed");
    }
  };

  return (
      <section className="flex-1 border border-gray-200 dark:border-gray-700 rounded-lg p-6 sm:p-8 bg-white dark:bg-gray-800 shadow-md relative"> {/* Added relative positioning */}
        <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input
                  type="text" id="firstName" name="firstName" value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="e.g., Jane" required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input
                  type="text" id="lastName" name="lastName" value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  placeholder="e.g., Doe" required
              />
            </div>
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
            <input
                type="email" id="email" name="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g., jane.doe@example.com" required
            />
          </div>
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
            <input
                type="tel" id="phone" name="phone" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                placeholder="e.g., +49 789 373 568"
            />
          </div>
          {/* Personal Address Section */}
          <div className="space-y-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Personal Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Country</label>
                <input
                    type="text" id="country" name="country" value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., Germany"
                />
              </div>
              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">City</label>
                <input
                    type="text" id="city" name="city" value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., Berlin"
                />
              </div>
              {/* Address */}
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Address</label>
                <input
                    type="text" id="address" name="address" value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., Berliner Straße 5"
                />
              </div>
              {/* Zip Code */}
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Zip Code</label>
                <input
                    type="text" id="zipCode" name="zipCode" value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    placeholder="e.g., 10115"
                />
              </div>
            </div>
          </div>


          {/* Submit Button and Success Message Area */}
          <div className="flex justify-end items-center pt-4 gap-4">
            {showSuccessMessage && (
                <div
                    role="alert"
                    className="px-4 py-2 rounded-md bg-green-100 dark:bg-green-900 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-200 text-sm"
                >
                  Changes are saved!
                </div>
            )}
            <button
                type="submit"
                className="inline-flex justify-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      </section>
  );
};

export default ProfileSettingsPage;