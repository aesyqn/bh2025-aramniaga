import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, User } from 'lucide-react';

const BottomNav = () => {
    return (
        <nav className="sticky bottom-0 z-50 bg-white border-t border-gray-100 pb-safe mt-auto shrink-0">
            <div className="flex justify-around items-center h-16">
                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-teal-500' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <Home size={24} />
                    <span className="text-xs font-medium">Home</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-teal-500' : 'text-gray-400 hover:text-gray-600'
                        }`
                    }
                >
                    <User size={24} />
                    <span className="text-xs font-medium">Profil</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default BottomNav;
