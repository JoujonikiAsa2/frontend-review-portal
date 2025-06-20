import React from 'react';

const CustomLoader = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Bouncing Dots */}
        <div className="flex space-x-4">
          <div
            className="w-4 h-4 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: "0s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-black dark:bg-white animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-4 h-4 rounded-full bg-green-600 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>

        {/* Loader Text */}
        <div className="text-green-600 text-lg font-semibold animate-pulse">
          Loading...
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;
