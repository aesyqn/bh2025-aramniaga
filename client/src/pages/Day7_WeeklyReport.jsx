import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import confetti from 'canvas-confetti';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trophy, Download } from 'lucide-react';

const Day7_WeeklyReport = () => {
    const { user, updateUser } = useAuth();
    const [showConfetti, setShowConfetti] = useState(false);

    useEffect(() => {
        if (!showConfetti) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            setShowConfetti(true);

            // Mark as fully completed
            if (user.progress < 8) {
                userAPI.updateProgress(7).then(() => {
                    updateUser({ progress: 8 });
                });
            }
        }
    }, []);

    const data = [
        { name: 'H1', followers: 100 },
        { name: 'H2', followers: 120 },
        { name: 'H3', followers: 150 },
        { name: 'H4', followers: 180 },
        { name: 'H5', followers: 250 },
        { name: 'H6', followers: 300 },
        { name: 'H7', followers: 450 },
    ];

    return (
        <div className="pb-24">
            <Header title="Hari 7: Laporan Mingguan" showBack />

            <div className="p-4">
                <div className="text-center mb-8 animate-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Trophy size={40} className="text-yellow-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tahniah, {user?.username}! 🎉</h2>
                    <p className="text-gray-500">Anda telah tamatkan cabaran 7 hari!</p>
                </div>

                <Card className="mb-6">
                    <h3 className="font-bold text-gray-900 mb-4">Pertumbuhan Pengikut</h3>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <Tooltip />
                                <Line type="monotone" dataKey="followers" stroke="#14b8a6" strokeWidth={3} dot={{ fill: '#14b8a6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-teal-50 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-teal-600 mb-1">7</p>
                        <p className="text-xs text-teal-800 uppercase font-bold">Hari Konsisten</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-xl text-center">
                        <p className="text-3xl font-bold text-orange-600 mb-1">5</p>
                        <p className="text-xs text-orange-800 uppercase font-bold">Skill Baru</p>
                    </div>
                </div>

                <Button className="w-full">
                    <Download size={20} className="mr-2" />
                    Download Sijil Tamat
                </Button>
            </div>
        </div>
    );
};

export default Day7_WeeklyReport;
