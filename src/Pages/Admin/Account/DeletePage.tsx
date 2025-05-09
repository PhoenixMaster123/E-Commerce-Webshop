import React, { useState, useEffect } from "react";
import { Trash2, Loader2, XCircle, CheckCircle } from "lucide-react"; // Added Loader2, XCircle, CheckCircle icons

const DeleteAccountPage: React.FC = () => {
  const [confirming, setConfirming] = useState<boolean>(false);
  const [password, setPassword] = useState<string>(""); // State for password input
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false); // State for initial 'deleting...' message
  const [finalSuccess, setFinalSuccess] = useState<boolean>(false); // State for final success message

  // Effect to manage the 'deleting...' message visibility and trigger final state
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (deleteSuccess) {
      // Set a timer to hide the 'deleting...' message after 2 seconds
      timer = setTimeout(() => {
        setDeleteSuccess(false); // Hide the initial message
        setFinalSuccess(true); // Show the final success message or trigger redirect
        // In a real app, you'd likely redirect here:
        // navigate('/'); // Example using React Router
        console.log("Account successfully processed, ready for redirect/final message.");
      }, 2000); // Show 'deleting...' message for 2 seconds
    }

    // Cleanup function to clear the timer
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [deleteSuccess]); // This effect runs whenever deleteSuccess changes

  const handleDeleteAccount = async () => {
    setError(null); // Clear previous errors
    setLoading(true); // Start loading
    setDeleteSuccess(false); // Hide any previous messages
    setFinalSuccess(false); // Hide any previous messages

    // --- Simulate Backend Operations ---
    // In a real app, replace this with your actual API call
    try {
      // Simulate password validation (replace with actual API validation)
      if (password !== "correctpassword") { // Use a placeholder password
        throw new Error("Incorrect password.");
      }

      // Simulate the deletion process API call
      await new Promise((resolve, reject) => {
        const success = Math.random() > 0.2; // 80% chance of success, 20% failure for demo
        setTimeout(() => {
          if (success) {
            resolve(null);
          } else {
            reject(new Error("Backend deletion failed."));
          }
        }, 1500); // Simulate network delay
      });

      // If simulation successful:
      setLoading(false);
      setDeleteSuccess(true); // Trigger the 'deleting...' message and the useEffect timer

    } catch (err: any) {
      // If simulation failed or password incorrect:
      setLoading(false);
      setError(err.message || "An unknown error occurred during deletion.");
      setDeleteSuccess(false); // Ensure message is not shown
      setFinalSuccess(false); // Ensure message is not shown
    }
    // --- End Simulation ---
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

  // Show the final success message block if deletion was ultimately successful
  if (finalSuccess) {
      return (
          <div className="container mx-auto p-6 flex justify-center items-center min-h-screen">
              <div className="flex flex-col items-center bg-green-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-8 border border-green-700 text-center">
                  <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
                  <h2 className="text-2xl font-semibold text-white mb-4">Account Deleted Successfully</h2>
                  <p className="text-white mb-6">Your account and all associated data have been permanently removed.</p>
                  {/* You might add a button here to go to the homepage or login page */}
                  {/* <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Go to Homepage</button> */}
              </div>
          </div>
      );
  }


  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8">
        {/* Delete Confirmation Header */}
        <div className="flex items-center gap-3 mb-8">
          <Trash2 className="text-red-600 w-9 h-10" />
          <h2 className="text-2xl font-semibold text-white-900">
            Delete Your Account
          </h2>
        </div>

        {/* Warning Message */}
        <p className="text-lg text-white mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>

        {/* Confirmation Prompt */}
        {confirming ? (
          <div className="space-y-4 w-full max-w-sm"> {/* Added w-full max-w-sm for better input styling */}
             <p className="text-sm text-white text-center">
               Warning: Deleting your account will erase all your data and preferences permanently.
               <br/> To confirm, please enter your password below.
             </p>
             <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={loading} // Disable input while loading
             />

             {/* Error Message */}
             {error && (
                <div className="text-red-400 text-sm text-center flex items-center justify-center gap-2">
                    <XCircle size={18} />
                    {error}
                </div>
             )}


            <div className="flex gap-4 justify-center"> {/* Centered buttons */}
              <button
                onClick={handleDeleteAccount}
                className={`px-6 py-3 bg-red-600 text-white font-semibold rounded-md transition-colors flex items-center justify-center gap-2
                          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
                disabled={loading || !password} // Disable if loading or password is empty
              >
                {loading && <Loader2 className="animate-spin" size={20} />}
                {loading ? 'Deleting...' : 'Yes, Delete My Account'}
              </button>
              <button
                onClick={handleCancelConfirmation} // Use new cancel handler
                className={`px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-md transition-colors
                          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-400'}`}
                 disabled={loading} // Disable cancel while loading
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

        {/* Initial Success Message - "Your account is being deleted..." */}
        {/* This message is shown briefly after clicking delete if the process starts */}
        {deleteSuccess && (
          <div className="mt-6 text-center text-green-600">
            <p>Your account is being deleted...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteAccountPage;