import { useState, useEffect } from 'react';
import { Loader2, XCircle, Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import React from 'react';
import { useTheme } from "next-themes";

// Define the structure for the profile data we expect to display
interface UserProfileData {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string | null;
    country?: string | null;
    city?: string | null;
    bio?: string | null;
    avatarUrl?: string | null;
    joinDate: Date;
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
    // --- Theme Management ---
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    // --- State Management ---
    const [profileData, setProfileData] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    // --- Effect to Fetch Profile Data ---
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);

            // Simulate API call delay
            try {
                const mockProfileData: UserProfileData = await new Promise((resolve, reject) => {
                    setTimeout(() => {

                        const success = Math.random() > 0.1;

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
                                bio: 'Just a regular user interested in cool stuff.\nAnother line here for the bio.', // Example bio with newline
                                avatarUrl: 'https://via.placeholder.com/150/4F46E5/FFFFFF?text=JD', // Using Indigo background
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
                <div className={`flex-1 p-6 rounded-lg shadow-md text-center flex items-center justify-center min-h-64
                          ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
                    <Loader2 className="animate-spin mr-3" size={24} /> Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
                <div className={`flex-1 p-6 rounded-lg shadow-md text-center flex items-center justify-center min-h-64 gap-3
                          ${isDarkTheme ? 'bg-red-900 bg-opacity-30 text-red-400' : 'bg-red-100 text-red-700'}`}>
                    <XCircle size={24} /> {error}
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="container mx-auto px-4 py-8 md:flex md:gap-8">
                <div className={`flex-1 p-6 rounded-lg shadow-md text-center flex items-center justify-center min-h-64
                           ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
                    <XCircle className="mr-3" size={24} /> Profile data not available.
                </div>
            </div>
        );
    }


    // --- Render Profile Data ---
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className={`rounded-lg shadow-xl overflow-hidden
                      ${isDarkTheme ? 'bg-gray-800' : 'bg-white'}`}>
                {/* Header Section */}
                <div className={`relative h-32 flex items-center justify-center
                          ${isDarkTheme ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h1 className={`text-3xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>User Profile</h1>
                </div>
                <div className="p-6 sm:p-8 pt-0">
                    {/* Avatar */}
                    <div className="-mt-16 sm:-mt-20 flex justify-center">
                        {profileData.avatarUrl ? (
                            <img
                                className={`size-24 sm:size-32 rounded-full border-4 object-cover
                                          ${isDarkTheme ? 'border-gray-800 bg-gray-600' : 'border-white bg-gray-300'}`}
                                src={profileData.avatarUrl}
                                alt={`${profileData.firstName} ${profileData.lastName}'s avatar`}
                            />
                        ) : (
                            // Fallback Avatar (e.g., initials or default icon)
                            <div className={`size-24 sm:size-32 rounded-full border-4 flex items-center justify-center text-white text-5xl font-semibold
                                       ${isDarkTheme ? 'border-gray-800 bg-indigo-600' : 'border-white bg-indigo-500'}`}>
                                {profileData.firstName.charAt(0)}{profileData.lastName.charAt(0)}
                            </div>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="text-center mt-4">
                        <h2 className={`text-2xl font-bold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{profileData.firstName} {profileData.lastName}</h2>
                        <p className={`text-sm ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>@{profileData.username}</p>
                    </div>

                    {/* About Section */}
                    <div className={`mt-6 pt-6 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>About</h3>
                        {profileData.bio && profileData.bio.trim() !== '' ? (
                            <p className={`text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                {profileData.bio.split('\n').map((line, index, array) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < array.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        ) : (
                            <p className={`text-base italic ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
                                This user hasn't added a bio yet.
                            </p>
                        )}
                    </div>


                    {/* Contact and Location Info */}
                    <div className={`mt-6 pt-6 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-lg font-semibold mb-3 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Contact & Location</h3>
                        <div className="space-y-3">
                            {/* Email */}
                            <div className={`flex items-center text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                <Mail size={20} className={`mr-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span>{profileData.email}</span>
                            </div>
                            {/* Phone (Conditional) */}
                            {profileData.phone && (
                                <div className={`flex items-center text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <Phone size={20} className={`mr-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span>{profileData.phone}</span>
                                </div>
                            )}
                            {/* Location (Conditional) */}
                            {(profileData.city || profileData.country) && (
                                <div className={`flex items-center text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                    <MapPin size={20} className={`mr-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                                    <span>
                                           {[profileData.city, profileData.country].filter(Boolean).join(', ')}
                                       </span>
                                </div>
                            )}
                            {/* Join Date */}
                            <div className={`flex items-center text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                <CalendarDays size={20} className={`mr-3 ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`} />
                                <span>Joined on {formatDate(profileData.joinDate)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;