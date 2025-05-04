import React from 'react';

const CustomLoader = () => {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center">

          <div className="flex space-x-2">
            <div
              className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-yellow-400 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-orange-400 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
            <div
              className="w-2 h-2 rounded-full bg-orange-500 animate-bounce"
              style={{ animationDelay: "0.6s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomLoader;