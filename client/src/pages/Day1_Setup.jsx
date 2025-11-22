import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../utils/api';
import Header from '../components/Header';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import Card from '../components/Card';

const Day1_Setup = () => {
    const { user, updateUser } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        businessName: user?.businessName || '',
        niche: user?.niche || '',
        description: user?.description || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await userAPI.updateProfile(formData);
            await userAPI.updateProgress(1);
            updateUser({ ...formData, progress: Math.max(user.progress, 2) });
            navigate('/dashboard');
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pb-24">
            <Header title="Hari 1: Setup Bisnes" showBack />
            <div className="p-4">
                <div className="mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Jom Mula! 🚀</h2>
                    <p className="text-gray-500 text-sm">Beritahu kami tentang bisnes anda supaya AI boleh bantu dengan lebih tepat.</p>
                </div>

                <Card>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <InputGroup
                            label="Nama Bisnes"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Cth: Kek Sedap Melaka"
                            required
                        />
                        <InputGroup
                            label="Niche / Kategori"
                            name="niche"
                            value={formData.niche}
                            onChange={handleChange}
                            placeholder="Cth: Makanan & Minuman"
                            required
                        />
                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-gray-700">Penerangan Ringkas</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Kami menjual kek lapis Sarawak asli..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none min-h-[100px]"
                            />
                        </div>

                        <Button type="submit" loading={loading} className="mt-4">
                            Simpan & Selesai
                        </Button>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Day1_Setup;
