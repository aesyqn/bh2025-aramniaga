import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Mail, Briefcase } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-4 pb-24">
            <div className="mb-6 text-center">
                <div className="w-24 h-24 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center text-teal-600 text-3xl font-bold border-4 border-white shadow-lg">
                    {user?.username?.[0]?.toUpperCase() || 'U'}
                </div>
                <h1 className="text-xl font-bold text-gray-900">{user?.username}</h1>
                <p className="text-gray-500 text-sm">Ahli sejak 2025</p>
            </div>

            <div className="flex flex-col gap-4">
                <Card>
                    <h3 className="font-bold text-gray-900 mb-4">Maklumat Peribadi</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <User className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Nama Pengguna</p>
                                <p className="font-medium text-gray-800">{user?.username}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Mail className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Emel</p>
                                <p className="font-medium text-gray-800">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                            <Briefcase className="text-gray-400" size={20} />
                            <div>
                                <p className="text-xs text-gray-500 uppercase">Bisnes</p>
                                <p className="font-medium text-gray-800">{user?.businessName || 'Belum set'}</p>
                            </div>
                        </div>
                    </div>
                </Card>

                <Button variant="outline" onClick={logout} className="mt-4 text-red-500 border-red-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600">
                    <LogOut size={18} className="mr-2" />
                    Log Keluar
                </Button>
            </div>
        </div>
    );
};

export default Profile;
