import { useState, useEffect } from 'react';
import {XCircle, Mail, Phone, MapPin, CalendarDays, UserRound, UserCircle, RefreshCcw } from "lucide-react"; // Import RefreshCcw
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
    joinDate: Date;
}

const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
};

interface InfoRowProps {
    icon: React.ElementType<any>;
    value: string | null | undefined;
    isDarkTheme: boolean;
}

const InfoRow: React.FC<InfoRowProps> = ({ icon: Icon, value, isDarkTheme }) => {
    if (!value) return null;

    return (
        <div className={`flex items-start text-base ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            <Icon size={20} className={`flex-shrink-0 mr-3 mt-1 ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <span className="break-words">{value}</span>
        </div>
    );
};


const AccountPage = () => {
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark';

    const [profileData, setProfileData] = useState<UserProfileData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const mockProfileData: UserProfileData = await new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const success = Math.random() > 0.05; // 95% chance of success

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
                                bio: 'Passionate about web development, open-source, and contributing to the tech community. Always learning and exploring new technologies. \n\nLet\'s connect!',
                                joinDate: new Date(2023, 5, 15),
                            });
                        } else {
                            reject(new Error("Failed to load profile data. Please try again later."));
                        }
                    }, 1500);
                });

                setProfileData(mockProfileData);

            } catch (err: any) {
                console.error("Error fetching profile:", err);
                setError(err.message || "An unexpected error occurred while fetching profile data.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);


    // --- Conditional Rendering: Loading, Error, or Data ---

    if (isLoading) {
        return (
            <div className={`fixed inset-0 flex flex-col items-center justify-center z-50
                            ${isDarkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-gray-200 bg-opacity-90'}`}>
                <RefreshCcw className={`w-12 h-12 animate-spin mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Loading user profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className={`p-6 rounded-lg shadow-md border-2 text-center flex flex-col items-center justify-center
                          ${isDarkTheme ? 'bg-red-900 bg-opacity-30 text-red-400 border-red-700' : 'bg-red-100 text-red-700 border-red-300'}`}>
                    <XCircle size={32} className="mb-3" />
                    <span className="text-lg font-medium">{error}</span>
                </div>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className={`p-6 rounded-lg shadow-md text-center flex flex-col items-center justify-center
                           ${isDarkTheme ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600'}`}>
                    <XCircle className="mb-3" size={32} />
                    <span className="text-lg">Profile data not available.</span>
                </div>
            </div>
        );
    }

    const { firstName, lastName, username, email, phone, country, city, bio, joinDate } = profileData;
    const displayName = `${firstName} ${lastName}`;
    const displayLocation = [city, country].filter(Boolean).join(', ');


    // --- Render Profile Data (only when not loading and no error) ---
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className={`rounded-2xl shadow-2xl overflow-hidden
                      ${isDarkTheme ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'}`}>

                <div className={`relative h-40 flex flex-col items-center justify-center
                          ${isDarkTheme ? 'bg-gradient-to-r from-indigo-700 to-purple-800' : 'bg-gradient-to-r from-indigo-600 to-purple-700'}`}>
                    <h1 className="text-4xl font-extrabold text-white z-10 drop-shadow-lg">User Profile</h1>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                    <div className="-mt-20 sm:-mt-24 flex justify-center z-20 relative">
                        <div className={`size-32 sm:size-40 rounded-full border-4 flex items-center justify-center transition-all duration-300
                                       ${isDarkTheme ? 'border-gray-900 bg-indigo-700 shadow-lg text-white' : 'border-white bg-indigo-600 shadow-xl text-white'}`}>
                            <UserCircle
                                size={120}
                                className={`${isDarkTheme ? 'text-indigo-200' : 'text-indigo-100'} `}
                            />
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="text-center mt-6">
                        <h2 className={`text-3xl font-extrabold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{displayName}</h2>
                        <p className={`text-base font-medium ${isDarkTheme ? 'text-indigo-400' : 'text-indigo-600'}`}>@{username}</p>
                    </div>

                    {/* About Section */}
                    <div className={`mt-8 pt-6 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>About Me</h3>
                        {bio && bio.trim() !== '' ? (
                            <p className={`text-base leading-relaxed ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                                {bio.split('\n').map((line, index, array) => (
                                    <React.Fragment key={index}>
                                        {line}
                                        {index < array.length - 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </p>
                        ) : (
                            <div className={`flex items-center text-base italic ${isDarkTheme ? 'text-gray-500' : 'text-gray-400'} p-3 rounded-md border
                                      ${isDarkTheme ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                                <UserRound size={20} className="mr-3 flex-shrink-0" />
                                <span>This user hasn't added a bio yet.</span>
                            </div>
                        )}
                    </div>


                    {/* Contact and Location Info */}
                    <div className={`mt-8 pt-6 border-t ${isDarkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>Contact & Details</h3>
                        <div className="space-y-4">
                            <InfoRow icon={Mail} value={email} isDarkTheme={isDarkTheme} />
                            <InfoRow icon={Phone} value={phone} isDarkTheme={isDarkTheme} />
                            <InfoRow icon={MapPin} value={displayLocation} isDarkTheme={isDarkTheme} />
                            <InfoRow icon={CalendarDays} value={`Joined on ${formatDate(joinDate)}`} isDarkTheme={isDarkTheme} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-4"></div>
        </div>
    );
};

export default AccountPage;