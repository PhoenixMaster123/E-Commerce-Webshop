import React, {useState, useEffect, useContext} from "react";
import { Trash2, Loader2, XCircle, CheckCircle, RefreshCcw } from "lucide-react";
import {ThemeContext} from "../../../contexts/ThemeContext.tsx";

const DeleteAccountPage: React.FC = () => {
  // --- Theme Management ---
  const { isDarkMode } = useContext(ThemeContext);
  const isDarkTheme = isDarkMode;

  const [confirming, setConfirming] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
  const [finalSuccess, setFinalSuccess] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(true);

  useEffect(() => {
    const initialLoadTimer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(initialLoadTimer);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (deleteSuccess) {
      timer = setTimeout(() => {
        setDeleteSuccess(false);
        setFinalSuccess(true);
        console.log("Account successfully processed, ready for redirect/final message.");
      }, 2000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [deleteSuccess]);

  const handleDeleteAccount = async () => {
    setError(null);
    setLoading(true)
    setDeleteSuccess(false);
    setFinalSuccess(false);
    
    try {
      if (password !== "correctpassword") {
        throw new Error("Incorrect password.");
      }

      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.2;
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error("Backend deletion failed."));
          }
        }, 1500);
      });

      setLoading(false);
      setDeleteSuccess(true);

    } catch (err: unknown) {
      let errorMessage = "An unknown error occurred during deletion.";
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setLoading(false);
      setError(errorMessage);
      setDeleteSuccess(false);
      setFinalSuccess(false);
    }
  };

  // Reset state when exiting confirmation
  const handleCancelConfirmation = () => {
    setConfirming(false);
    setPassword("");
    setLoading(false);
    setError(null);
    setDeleteSuccess(false);
    setFinalSuccess(false);
  };

  const handleGoToHomepage = () => {
    window.location.href = '/';
  };

  if (finalSuccess) {
    return (
        <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
          <div className={`flex flex-col items-center shadow-lg rounded-xl p-8 border text-center
                          ${isDarkTheme ? 'bg-green-900 bg-opacity-50 backdrop-filter backdrop-blur-lg border-green-700' : 'bg-green-100 border-green-200 shadow-md'}`}>
            <CheckCircle className={`w-12 h-12 mb-4 ${isDarkTheme ? 'text-green-500' : 'text-green-700'}`} />
            <h2 className={`text-2xl font-semibold mb-4 ${isDarkTheme ? 'text-white' : 'text-green-900'}`}>Account Deleted Successfully</h2>
            <p className={`mb-6 ${isDarkTheme ? 'text-white' : 'text-green-800'}`}>Your account and all associated data have been permanently removed.</p>
            <button
                onClick={handleGoToHomepage}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
            >
              Go to Homepage
            </button>
          </div>
        </div>
    );
  }

  if (pageLoading) {
    return (
        <div className={`fixed inset-0 flex flex-col items-center justify-center z-50
                        ${isDarkTheme ? 'bg-gray-900 bg-opacity-90' : 'bg-gray-200 bg-opacity-90'}`}>
          <RefreshCcw className={`w-12 h-12 animate-spin mb-4 ${isDarkTheme ? 'text-blue-400' : 'text-blue-600'}`} />
          <p className={`text-xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Loading delete account...</p>
        </div>
    );
  }

  return (
      <div className="container mx-auto p-6">
        <div className={`flex flex-col items-center shadow-lg rounded-xl p-6 border mb-8
                   ${isDarkTheme ? 'bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg border-red-700' : 'bg-red-100 border-red-200 shadow-md'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Trash2 className={`w-9 h-10 ${isDarkTheme ? 'text-red-500' : 'text-red-600'}`} />
            <h2 className={`text-2xl font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
              Delete Your Account
            </h2>
          </div>

          {/* Warning Message */}
          <p className={`text-lg mb-6 ${isDarkTheme ? 'text-white' : 'text-gray-700'}`}>
            Are you sure you want to delete your account? This action cannot be undone.
          </p>

          {/* Confirmation Prompt */}
          {confirming ? (
              <div className="space-y-4 w-full max-w-sm">
                <p className={`text-sm text-center ${isDarkTheme ? 'text-gray-300' : 'text-gray-600'}`}>
                  Warning: Deleting your account will erase all your data and preferences permanently.
                  <br/> To confirm, please enter your password below.
                </p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500
                            ${isDarkTheme ? 'bg-gray-700 text-white placeholder-gray-400 border border-gray-600' : 'bg-white text-gray-900 placeholder-gray-500 border border-gray-300'}`}
                    disabled={loading}
                />

                {/* Error Message */}
                {error && (
                    <div className={`text-sm text-center flex items-center justify-center gap-2 ${isDarkTheme ? 'text-red-400' : 'text-red-600'}`}>
                      <XCircle size={18} />
                      {error}
                    </div>
                )}


                <div className="flex gap-4 justify-center">
                  <button
                      onClick={handleDeleteAccount}
                      className={`px-6 py-3 bg-red-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
                           ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                      disabled={loading || !password}
                  >
                    {loading && <Loader2 className="animate-spin" size={20} />}
                    {loading ? 'Deleting...' : 'Yes, Delete My Account'}
                  </button>
                  <button
                      onClick={handleCancelConfirmation}
                      className={`px-6 py-3 font-semibold rounded-md transition-colors
                           ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                           ${isDarkTheme ? 'bg-gray-600 text-white hover:bg-gray-700' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
                      disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
          ) : (
              <div>
                <button
                    onClick={() => setConfirming(true)}
                    className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete My Account
                </button>
              </div>
          )}

          {deleteSuccess && (
              <div className={`mt-6 text-center ${isDarkTheme ? 'text-green-400' : 'text-green-600'}`}>
                <p>Your account is being deleted...</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default DeleteAccountPage;