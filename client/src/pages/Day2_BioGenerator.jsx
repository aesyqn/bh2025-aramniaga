import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI, userAPI } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import ComparisonCard from '../components/ComparisonCard';
import LoadingOverlay from '../components/LoadingOverlay';

const Day2_BioGenerator = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [generatedBios, setGeneratedBios] = useState([]);
    const [currentBio, setCurrentBio] = useState(user?.bio || '');

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await aiAPI.generateBio({
                businessName: user?.businessName,
                niche: user?.niche,
                description: user?.description,
                currentBio
            });
            setGeneratedBios(response.data.bios || []);
            await userAPI.updateProgress(2);
            updateUser({ progress: Math.max(user.progress, 3) });
        } catch (error) {
            console.error('Error generating bio:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24">
            <Header title="Hari 2: Bio Power" showBack />
            {loading && <LoadingOverlay message="AI sedang menulis bio padu..." />}

            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Bio Yang Memukau ✨</h2>
                    <p className="text-gray-500 text-sm">Bio Instagram adalah "kedai depan" anda. Pastikan ia menarik pelanggan dalam 3 saat pertama.</p>
                </div>

                <Card className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Bio Sekarang (Optional)</label>
                            <textarea
                                value={currentBio}
                                onChange={(e) => setCurrentBio(e.target.value)}
                                placeholder="Copy paste bio Instagram anda sekarang..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 outline-none min-h-[80px]"
                            />
                        </div>
                        <Button onClick={handleGenerate} loading={loading}>
                            Jana dengan AI
                        </Button>
                    </div>
                </Card>

                {generatedBios.length > 0 && (
                    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <h3 className="font-bold text-gray-900">Pilihan Bio Terbaik:</h3>
                        {generatedBios.map((bio, index) => (
                            <ComparisonCard
                                key={index}
                                oldBio={currentBio}
                                newBio={bio}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Day2_BioGenerator;
