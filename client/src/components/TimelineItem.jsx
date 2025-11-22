import React from 'react';
import { CheckCircle2, Lock, ArrowRight, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TimelineItem = ({ day, title, description, status, isLocked }) => {
    const navigate = useNavigate();

    const getStatusConfig = () => {
        if (isLocked) return { icon: Lock, color: 'text-gray-400', bg: 'bg-gray-100', border: 'border-gray-200' };
        if (status === 'completed') return { icon: CheckCircle2, color: 'text-teal-500', bg: 'bg-teal-50', border: 'border-teal-200' };
        return { icon: PlayCircle, color: 'text-orange-500', bg: 'bg-white', border: 'border-orange-200' };
    };

    const config = getStatusConfig();
    const Icon = config.icon;

    return (
        <div
            onClick={() => !isLocked && navigate(`/day/${day}`)}
            className={`
        relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200
        ${config.border} ${config.bg}
        ${isLocked ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:scale-[1.02]'}
      `}
        >
            <div className={`
        w-12 h-12 rounded-full flex items-center justify-center shrink-0
        ${isLocked ? 'bg-gray-200' : 'bg-white shadow-sm'}
      `}>
                <span className={`font-bold text-lg ${isLocked ? 'text-gray-500' : 'text-gray-800'}`}>
                    {day}
                </span>
            </div>

            <div className="flex-1 min-w-0">
                <h3 className={`font-bold text-sm ${isLocked ? 'text-gray-600' : 'text-gray-900'}`}>
                    {title}
                </h3>
                <p className="text-xs text-gray-500 truncate">{description}</p>
            </div>

            <div className={`shrink-0 ${config.color}`}>
                <Icon size={24} />
            </div>
        </div>
    );
};

export default TimelineItem;
