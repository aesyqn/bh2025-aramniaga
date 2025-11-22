import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import InputGroup from '../components/InputGroup';
import Card from '../components/Card';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await register(formData);
        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 flex flex-col justify-center min-h-[80vh]">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Mula Sekarang 🚀</h1>
                <p className="text-gray-500">Bina empayar bisnes anda dalam 7 hari.</p>
            </div>

            <Card className="mb-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <InputGroup
                        label="Nama Pengguna"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Cth: AliMaju"
                        required
                    />
                    <InputGroup
                        label="Emel"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nama@contoh.com"
                        required
                    />
                    <InputGroup
                        label="Kata Laluan"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                    />

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <Button type="submit" loading={loading} className="mt-2">
                        Daftar Akaun
                    </Button>
                </form>
            </Card>

            <p className="text-center text-gray-600">
                Sudah ada akaun?{' '}
                <Link to="/login" className="text-teal-600 font-bold hover:underline">
                    Log Masuk
                </Link>
            </p>
        </div>
    );
};

export default Register;
