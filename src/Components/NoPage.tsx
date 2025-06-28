import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NoPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center text-center p-8">
                {/* Optional: Add a cool SVG illustration. 
                    Get free ones from sites like https://undraw.co/ or https://storyset.com/
                    <img src="/illustrations/404-lost-in-space.svg" alt="Lost in space" className="w-64 h-64 mb-8" /> 
                */}

                <h1
                    className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                >
                    404
                </h1>
                <h2 className="mt-4 text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
                    Page Not Found
                </h2>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Oops! The page you're looking for seems to have taken a wrong turn.
                </p>
                <Link
                    to="/home"
                    className="mt-10 inline-flex items-center px-6 py-3 font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                >
                    <FaArrowLeft className="mr-2" />
                    Go Back Home
                </Link>
            </div>
        </div>
    );
};

export default NoPage;