import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI, userAPI } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import Card from '../components/Card';
import LoadingOverlay from '../components/LoadingOverlay';
import { Hash, Copy, Check } from 'lucide-react';

const Day5_HashtagTool = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [hashtags, setHashtags] = useState([]);
    const [copied, setCopied] = useState(false);

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        setLoading(true);
        try {
            const response = await aiAPI.generateHashtags({
                keyword,
                niche: user?.niche
            });
            setHashtags(response.data.hashtags || []);
            await userAPI.updateProgress(5);
            updateUser({ progress: Math.max(user.progress, 6) });
        } catch (error) {
            console.error('Error generating hashtags:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyAll = () => {
        const allTags = hashtags.map(h => h.tag).join(' ');
        navigator.clipboard.writeText(allTags);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="pb-24">
            <Header title="Hari 5: Hashtag Tool" showBack />
            {loading && <LoadingOverlay message="AI sedang mencari hashtag viral..." />}

            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Hashtag Viral 🚀</h2>
                    <p className="text-gray-500 text-sm">Cari hashtag yang relevan untuk naikkan reach posting anda.</p>
                </div>

                <Card className="mb-6">
                    <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                        <InputGroup
                            label="Topik Posting"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            placeholder="Cth: Resepi Kek Batik"
                            required
                        />
                        <Button type="submit" loading={loading}>
                            Jana Hashtag
                        </Button>
                    </form>
                </Card>

                {hashtags.length > 0 && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-gray-900">Hashtag Dicadangkan:</h3>
                            <button
                                onClick={handleCopyAll}
                                className="text-sm text-teal-600 font-medium flex items-center gap-1 hover:underline"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                Copy Semua
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {hashtags.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white border border-gray-200 px-3 py-1.5 rounded-full text-sm text-gray-600 flex items-center gap-1"
                                >
                                    <Hash size={14} className="text-teal-500" />
                                    {item.tag.replace('#', '')}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Day5_HashtagTool;
