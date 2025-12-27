import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center pt-10 w-full min-h-37.5 sm:min-h-50">
      <div className="w-6 h-6 sm:w-8 sm:h-8 
                      border-3 border-pink-200 
                      border-t-pink-400 
                      rounded-full animate-spin">
      </div>
    </div>
  );
};

export default Loader;
