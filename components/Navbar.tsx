'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/remove', label: '开始使用' },
    { href: '/pricing', label: '定价' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-indigo-600">
            <Sparkles className="w-6 h-6" />
            QuickBG
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link href="/dashboard" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  仪表盘
                </Link>
                <button onClick={logout} className="px-4 py-2 text-sm text-gray-600 hover:text-red-500 transition-colors">
                  退出
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                  登录
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors">
                  免费注册
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-gray-600 hover:text-indigo-600 font-medium">
                {l.label}
              </Link>
            ))}
            <hr className="my-2" />
            {user ? (
              <>
                <Link href="/dashboard" onClick={() => setOpen(false)} className="block py-2 text-gray-600 hover:text-indigo-600 font-medium">
                  仪表盘
                </Link>
                <button onClick={() => { logout(); setOpen(false); }} className="block w-full text-left py-2 text-red-500 font-medium">
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="block py-2 text-gray-600 hover:text-indigo-600 font-medium">
                  登录
                </Link>
                <Link href="/register" onClick={() => setOpen(false)} className="block py-2 text-indigo-600 font-bold">
                  免费注册
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
