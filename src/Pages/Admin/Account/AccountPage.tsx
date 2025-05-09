import { useState, useEffect } from 'react';
import { Loader2, XCircle, Mail, Phone, MapPin, CalendarDays } from "lucide-react"; // Added User icon back
import React from 'react';

// Define the structure for the profile data we expect to display
interface UserProfileData {
  id: string; // Unique identifier
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null; // Optional field
  country?: string | null; // Optional field
  city?: string | null; // Optional field
  bio?: string | null; // Optional "About Me" field
  avatarUrl?: string | null; // Optional profile picture URL
  joinDate: Date; // When the account was created
}

// Helper function to format date
const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};


const AccountPage = () => {
  // --- State Management ---
  const [profileData, setProfileData] = useState<UserProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // --- Effect to Fetch Profile Data ---
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null); // Clear previous errors

      // Simulate API call delay
      try {
         const mockProfileData: UserProfileData = await new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate fetching data
                const success = Math.random() > 0.1; // 90% chance of success

                if (success) {
                    resolve({
                        id: 'user-123',
                        username: 'jane_doe_88',
                        firstName: 'Jane',
                        lastName: 'Doe',
                        email: 'jane.doe@example.com',
                        phone: '+1 555 123 4567',
                        country: 'USA',
                        city: 'New York',
                        bio: 'Just a regular user interested in cool stuff.', // Example bio
                        avatarUrl: 'https://via.placeholder.com/150/4A5568/E2E8F0?text=JD',
                        joinDate: new Date(2023, 5, 15),
                    });
                } else {
                    reject(new Error("Failed to load profile data."));
                }
            }, 1000);
         });

         setProfileData(mockProfileData);

      } catch (err: any) {
         console.error("Error fetching profile:", err);
         setError(err.message || "An unknown error occurred.");
      } finally {
         setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);


  // --- Conditional Rendering: Loading, Error, or Data ---
  if (isLoading) {
      return (
          <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
              <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-600 dark:text-gray-300 flex items-center justify-center min-h-64">
                  <Loader2 className="animate-spin mr-3" size={24} /> Loading profile...
              </div>
          </div>
      );
  }

  if (error) {
      return (
          <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
              <div className="flex-1 bg-red-900 bg-opacity-20 dark:bg-red-900 dark:bg-opacity-30 p-6 rounded-lg shadow-md text-center text-red-700 dark:text-red-400 flex items-center justify-center min-h-64 gap-3">
                  <XCircle size={24} /> {error}
              </div>
          </div>
      );
  }

  if (!profileData) {
      return (
           <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
               <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center text-gray-600 dark:text-gray-300 flex items-center justify-center min-h-64">
                   <XCircle className="mr-3" size={24} /> Profile data not available.
               </div>
           </div>
       );
  }


  // --- Render Profile Data ---
  return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
              {/* Header Section */}
              <div className="relative bg-gray-100 dark:bg-gray-700 h-32 flex items-center justify-center">
                 <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Profile</h1>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                  {/* Avatar */}
                  <div className="-mt-16 sm:-mt-20 flex justify-center">
                      {profileData.avatarUrl ? (
                         <img
                            className="size-24 sm:size-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 object-cover"
                            src={profileData.avatarUrl}
                            alt={`${profileData.firstName} ${profileData.lastName}'s avatar`}
                         />
                     ) : (
                         // Fallback Avatar (e.g., initials or default icon)
                         <div className="size-24 sm:size-32 rounded-full border-4 border-white dark:border-gray-800 bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-white text-5xl font-semibold">
                            {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                         </div>
                     )}
                  </div>

                  {/* Basic Info */}
                  <div className="text-center mt-4">
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.firstName} {profileData.lastName}</h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">@{profileData.username}</p>
                  </div>

                  {/* About Section - IMPROVED */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                      {profileData.bio && profileData.bio.trim() !== '' ? (
                          <p className="text-gray-700 dark:text-gray-300 text-base">
                            {/* Render bio content, replacing newlines with <br> */}
                            {profileData.bio.split('\n').map((line, index, array) => (
                              <React.Fragment key={index}>
                                {line}
                                {index < array.length - 1 && <br />} {/* Add <br> except after the last line */}
                              </React.Fragment>
                            ))}
                          </p>
                      ) : (
                          <p className="text-gray-500 dark:text-gray-400 text-base italic">
                            This user hasn't added a bio yet.
                          </p>
                      )}
                  </div>


                  {/* Contact and Location Info */}
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact & Location</h3>
                      <div className="space-y-3">
                          {/* Email */}
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                              <Mail size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                              <span className="text-base">{profileData.email}</span>
                          </div>
                          {/* Phone (Conditional) */}
                             {profileData.phone && (
                                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                                     <Phone size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                     <span className="text-base">{profileData.phone}</span>
                                 </div>
                             )}
                             {/* Location (Conditional) */}
                             {(profileData.city || profileData.country) && (
                                 <div className="flex items-center text-gray-700 dark:text-gray-300">
                                     <MapPin size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                     <span className="text-base">
                                         {[profileData.city, profileData.country].filter(Boolean).join(', ')}
                                     </span>
                                 </div>
                             )}
                             {/* Join Date */}
                              <div className="flex items-center text-gray-700 dark:text-gray-300">
                                   <CalendarDays size={20} className="mr-3 text-gray-500 dark:text-gray-400" />
                                   <span className="text-base">Joined on {formatDate(profileData.joinDate)}</span>
                              </div>
                      </div>
                  </div>


                     {/* Optional: Link to Edit Profile */}
                     {/* Assuming you have a router and an edit page path */}
                     {/*
                     <div className="mt-6 text-center">
                         <Link href="/settings/profile" className="inline-block px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
                             Edit Profile
                         </Link>
                     </div>
                     */}

                </div>
          </div>
      </div>
  );
};

export default AccountPage;