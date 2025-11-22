import React from 'react';

const MobileContainer = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-xl relative flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default MobileContainer;
