import React from 'react';

const SpinLoading: React.FC = () => {
    return (
        <div className={'loader'}>
            <div className="spinner p-5 rounded-full flex space-x-3 dark:bg-[#252527] bg-gray-200">
                <div className="w-5 h-5 dark:bg-gray-300 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 dark:bg-gray-300 bg-gray-600 rounded-full animate-bounce"></div>
                <div className="w-5 h-5 dark:bg-gray-300 bg-gray-600 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};
export default SpinLoading;