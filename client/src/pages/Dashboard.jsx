import React from 'react';
import { useAuth } from '../context/AuthContext';
import StatsWidget from '../components/StatsWidget';
import TimelineItem from '../components/TimelineItem';

const Dashboard = () => {
    const { user } = useAuth();

    // Calculate progress based on completed days
    // If user has completed 0 days, they are on day 1 (progress 0)
    // If user has completed 1 day, they are on day 2 (progress 1)
    const progress = user?.completedDays?.length || 0;

    // Mock data for now, will be replaced by real data from API later if needed
    // or passed via props/context
    const days = [
        { id: 1, title: 'Hari 1: Setup Bisnes', desc: 'Set up profil dan matlamat', status: progress >= 1 ? 'completed' : 'unlocked' },
        { id: 2, title: 'Hari 2: Bio Power', desc: 'Jana bio yang memukau', status: progress >= 2 ? 'completed' : (progress >= 1 ? 'unlocked' : 'locked') },
        { id: 3, title: 'Hari 3: Analisis Foto', desc: 'AI check kualiti gambar', status: progress >= 3 ? 'completed' : (progress >= 2 ? 'unlocked' : 'locked') },
        { id: 4, title: 'Hari 4: Chat Coach', desc: 'Latih jawab customer', status: progress >= 4 ? 'completed' : (progress >= 3 ? 'unlocked' : 'locked') },
        { id: 5, title: 'Hari 5: Hashtag Tool', desc: 'Strategi hashtag viral', status: progress >= 5 ? 'completed' : (progress >= 4 ? 'unlocked' : 'locked') },
        { id: 6, title: 'Hari 6: Story Canvas', desc: 'Design story yang engage', status: progress >= 6 ? 'completed' : (progress >= 5 ? 'unlocked' : 'locked') },
        { id: 7, title: 'Hari 7: Laporan Mingguan', desc: 'Lihat progress anda', status: progress >= 7 ? 'completed' : (progress >= 6 ? 'unlocked' : 'locked') },
    ];

    return (
        <div className="p-4 pb-24">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Hai, {user?.username || 'Usahawan'}! 👋
                </h1>
                <p className="text-gray-500 text-sm">Jom sambung misi 7 hari anda.</p>
            </div>

            <StatsWidget
                followers={user?.stats?.followers || 0}
                views={user?.stats?.views || 0}
                likes={user?.stats?.likes || 0}
            />

            <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="font-bold text-gray-800">Perjalanan Anda</h2>
                    <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-1 rounded-full">
                        {Math.min(progress, 7)}/7 Selesai
                    </span>
                </div>

                {days.map((day) => (
                    <TimelineItem
                        key={day.id}
                        day={day.id}
                        title={day.title}
                        description={day.desc}
                        status={day.status}
                        isLocked={day.status === 'locked'}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
