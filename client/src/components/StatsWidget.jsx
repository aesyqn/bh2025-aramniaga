import React from 'react';
import { Users, Eye, Heart } from 'lucide-react';
import Card from './Card';

const StatsWidget = ({ followers, views, likes }) => {
    const stats = [
        { label: 'Pengikut', value: followers, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
        { label: 'Tayangan', value: views, icon: Eye, color: 'text-teal-500', bg: 'bg-teal-50' },
        { label: 'Suka', value: likes, icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
    ];

    return (
        <div className="grid grid-cols-3 gap-3 mb-6">
            {stats.map((stat, index) => (
                <Card key={index} padding="p-3" className="flex flex-col items-center justify-center gap-2">
                    <div className={`p-2 rounded-full ${stat.bg}`}>
                        <stat.icon size={20} className={stat.color} />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-gray-800 text-lg leading-none">{stat.value}</p>
                        <p className="text-[10px] text-gray-500 font-medium uppercase mt-1">{stat.label}</p>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default StatsWidget;
