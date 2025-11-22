import React from 'react';

const Card = ({ children, className = '', padding = 'p-4' }) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 ${padding} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
