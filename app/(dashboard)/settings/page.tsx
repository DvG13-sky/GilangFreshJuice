'use client';

import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'next/navigation';
import { LogOut, User, Shield, Store } from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { profile, logout } = useAuthStore();
  const router = useRouter();
  const isOwner = profile?.role === 'owner';

  const handleLogout = () => {
    logout();
    toast.success('Berhasil keluar');
    router.push('/login/');
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-4 safe-top">
      <header className="mb-6">
        <h1 className="text-2xl font-display font-bold text-neutral-800">
          Pengaturan
        </h1>
      </header>

      <div className="space-y-4">
        {/* Profile Card */}
        <div className="bg-white rounded-md border border-neutral-100 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-primary-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-800">{profile?.full_name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield size={12} className={isOwner ? 'text-primary-500' : 'text-secondary-500'} />
                <span className={`text-xs font-medium ${isOwner ? 'text-primary-600' : 'text-secondary-600'}`}>
                  {isOwner ? 'Owner' : 'Partner'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-white rounded-md border border-neutral-100 p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Store size={18} className="text-neutral-400" />
            <h3 className="text-sm font-semibold text-neutral-800">Informasi Gerai</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Nama</span>
              <span className="text-neutral-800 font-medium">Gilang Fresh Juice</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-neutral-400">Versi</span>
              <span className="text-neutral-800 font-medium">1.0.0</span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 h-12 bg-danger-50 text-danger-600 rounded-md font-semibold text-sm border border-danger-200 active:scale-[0.98] transition-transform"
        >
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </div>
  );
}
