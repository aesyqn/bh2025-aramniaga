import React from 'react';
import { Copy, Check } from 'lucide-react';
import Card from './Card';

const ComparisonCard = ({ oldBio, newBio }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(newBio);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4">
            <Card className="bg-gray-50 border-dashed">
                <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Bio Lama</h4>
                <p className="text-gray-600 text-sm italic">"{oldBio || 'Tiada bio'}"</p>
            </Card>

            <div className="flex justify-center -my-2 z-10">
                <div className="bg-white p-2 rounded-full shadow-sm border border-gray-100">
                    <span className="text-xl">⬇️</span>
                </div>
            </div>

            <Card className="border-teal-200 bg-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-teal-500"></div>
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <h4 className="text-xs font-bold text-teal-600 uppercase mb-2">Bio Baru (AI)</h4>
                        <p className="text-gray-800 text-sm font-medium leading-relaxed">{newBio}</p>
                    </div>
                    <button
                        onClick={handleCopy}
                        className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 text-gray-500 transition-colors shrink-0"
                    >
                        {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default ComparisonCard;
