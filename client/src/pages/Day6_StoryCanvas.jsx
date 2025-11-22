import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import { fileToBase64 } from '../utils/helpers';
import Header from '../components/Header';
import Button from '../components/Button';
import { Upload, Download, Type, Move } from 'lucide-react';
import html2canvas from 'html2canvas';

const Day6_StoryCanvas = () => {
    const { user, updateUser } = useAuth();
    const [background, setBackground] = useState(null);
    const [stickers, setStickers] = useState([]);
    const canvasRef = useRef(null);

    const handleBackgroundUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64 = await fileToBase64(file);
            setBackground(base64);
        }
    };

    const addSticker = (text) => {
        setStickers([...stickers, {
            id: Date.now(),
            text,
            x: 50,
            y: 50
        }]);
    };

    const handleDragStart = (e, id) => {
        e.dataTransfer.setData("text/plain", id);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData("text/plain"));
        const rect = canvasRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setStickers(stickers.map(s =>
            s.id === id ? { ...s, x, y } : s
        ));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDownload = async () => {
        if (canvasRef.current) {
            const canvas = await html2canvas(canvasRef.current);
            const link = document.createElement('a');
            link.download = 'story-design.png';
            link.href = canvas.toDataURL();
            link.click();

            await userAPI.updateProgress(6);
            updateUser({ progress: Math.max(user.progress, 7) });
        }
    };

    return (
        <div className="pb-24">
            <Header title="Hari 6: Story Canvas" showBack />

            <div className="p-4">
                <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer hover:bg-gray-200 whitespace-nowrap">
                        <Upload size={18} />
                        <span className="text-sm font-medium">Background</span>
                        <input type="file" accept="image/*" onChange={handleBackgroundUpload} className="hidden" />
                    </label>
                    <button onClick={() => addSticker("New Menu 🍔")} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 whitespace-nowrap">
                        + Teks Menu
                    </button>
                    <button onClick={() => addSticker("RM 10 🔥")} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium hover:bg-gray-200 whitespace-nowrap">
                        + Harga
                    </button>
                </div>

                <div
                    ref={canvasRef}
                    className="aspect-[9/16] bg-gray-200 rounded-xl relative overflow-hidden shadow-lg mb-4"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    {background ? (
                        <img src={background} alt="Background" className="w-full h-full object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <p>Upload gambar background</p>
                        </div>
                    )}

                    {stickers.map(sticker => (
                        <div
                            key={sticker.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, sticker.id)}
                            style={{ left: `${sticker.x}%`, top: `${sticker.y}%` }}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-4 py-2 rounded-xl shadow-lg cursor-move font-bold text-lg"
                        >
                            {sticker.text}
                        </div>
                    ))}
                </div>

                <Button onClick={handleDownload} disabled={!background}>
                    <Download size={20} className="mr-2" />
                    Download Story
                </Button>
            </div>
        </div>
    );
};

export default Day6_StoryCanvas;
