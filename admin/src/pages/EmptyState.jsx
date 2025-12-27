import React from "react";

const EmptyState = ({ text = "No products found" }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 flex items-center justify-center 
                      rounded-full bg-pink-100 mb-4">
        <span className="text-pink-500 text-3xl">📦</span>
      </div>
      <p className="text-gray-500 text-sm sm:text-base">
        {text}
      </p>
    </div>
  );
};

export default EmptyState;
