import React from 'react';

const ChatBubble = ({ message, isUser }) => {
    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`
        max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm
        ${isUser
                    ? 'bg-teal-500 text-white rounded-tr-none'
                    : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                }
      `}>
                {message}
            </div>
        </div>
    );
};

export default ChatBubble;
