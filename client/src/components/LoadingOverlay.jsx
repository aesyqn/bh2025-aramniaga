import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingOverlay = ({ message = "AI sedang berfikir..." }) => {
    return (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl max-w-xs mx-4 animate-in fade-in zoom-in duration-200">
                <div className="relative">
                    <div className="w-12 h-12 border-4 border-teal-100 rounded-full"></div>
                    <Loader2 className="w-12 h-12 text-teal-500 animate-spin absolute top-0 left-0" />
                </div>
                <p className="text-gray-700 font-medium text-center">{message}</p>
            </div>
        </div>
    );
};

export default LoadingOverlay;
