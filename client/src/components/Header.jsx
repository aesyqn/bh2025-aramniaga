import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Header = ({ title, showBack = false }) => {
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 h-14 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
                {showBack && (
                    <button
                        onClick={() => navigate(-1)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                )}
                <h1 className="font-semibold text-lg text-gray-800">{title}</h1>
            </div>
        </header>
    );
};

export default Header;
