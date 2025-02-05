import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50 border-solid"></div>
            <p className="text-lg font-medium text-gray-600">Loading your profile, please wait...</p>
        </div>
    );
};

export default Loading;
