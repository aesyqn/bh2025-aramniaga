import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { aiAPI, userAPI } from '../utils/api';
import { fileToBase64 } from '../utils/helpers';
import Header from '../components/Header';
import Button from '../components/Button';
import Card from '../components/Card';
import LoadingOverlay from '../components/LoadingOverlay';
import { Upload, Image as ImageIcon, Copy, Check } from 'lucide-react';

const Day3_PhotoAnalysis = () => {
    const { user, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [copied, setCopied] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const base64 = await fileToBase64(file);
            setPreview(base64);
            setAnalysis(null);
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await aiAPI.analyzeImage(formData);
            setAnalysis(response.data);

            await userAPI.updateProgress(3);
            updateUser({ progress: Math.max(user.progress, 4) });
        } catch (error) {
            console.error('Error analyzing image:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopyCaption = () => {
        if (analysis?.caption) {
            navigator.clipboard.writeText(analysis.caption);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="pb-24">
            <Header title="Hari 3: Analisis Foto" showBack />
            {loading && <LoadingOverlay message="AI sedang meneliti foto anda..." />}

            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Foto Yang Menjual 📸</h2>
                    <p className="text-gray-500 text-sm">Upload gambar produk anda. AI akan beri rating dan cadangan caption.</p>
                </div>

                <Card className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 hover:border-teal-500 transition-colors group cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                            />
                            {preview ? (
                                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-gray-400 group-hover:text-teal-500 transition-colors">
                                    <Upload size={40} className="mb-2" />
                                    <span className="text-sm font-medium">Tekan untuk upload</span>
                                </div>
                            )}
                        </div>

                        <Button onClick={handleAnalyze} disabled={!image} loading={loading}>
                            Analisis Foto
                        </Button>
                    </div>
                </Card>

                {analysis && (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <Card className="bg-teal-50 border-teal-200">
                            <h3 className="font-bold text-teal-800 mb-2">Komen AI:</h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">{analysis.feedback}</p>

                            <div className="bg-white p-4 rounded-xl border border-teal-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold text-teal-600 uppercase">Cadangan Caption</span>
                                    <button onClick={handleCopyCaption} className="text-gray-400 hover:text-teal-500">
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                </div>
                                <p className="text-gray-800 text-sm whitespace-pre-wrap">{analysis.caption}</p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Day3_PhotoAnalysis;
