'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { formatFileSize, formatDate } from '@/lib/utils';
import { BarChart3, Coins, Crown, LogOut, Image, Clock, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

// 模拟历史记录
const mockHistory = [
  { id: '1', fileName: 'product-photo-1.jpg', fileSize: 2456000, status: 'success' as const, processedAt: '2026-04-01T14:30:00Z' },
  { id: '2', fileName: 'portrait-headshot.png', fileSize: 1890000, status: 'success' as const, processedAt: '2026-04-01T10:15:00Z' },
  { id: '3', fileName: 'ecommerce-shoes.webp', fileSize: 3120000, status: 'success' as const, processedAt: '2026-03-31T16:45:00Z' },
  { id: '4', fileName: 'team-photo.jpg', fileSize: 5400000, status: 'success' as const, processedAt: '2026-03-30T09:20:00Z' },
  { id: '5', fileName: 'corrupted-file.png', fileSize: 500000, status: 'failed' as const, processedAt: '2026-03-29T11:00:00Z' },
];

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* 头部 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            欢迎回来，<span className="text-indigo-600">{user.email}</span>
          </h1>
          <p className="mt-1 text-gray-500">管理你的账户和查看使用记录</p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/remove"
            className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors text-sm"
          >
            开始抠图
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            退出
          </button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">本月处理</p>
              <p className="text-2xl font-bold text-gray-900">4 次</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Coins className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">剩余额度</p>
              <p className="text-2xl font-bold text-gray-900">{user.credits} 次</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Crown className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">账户类型</p>
              <p className="text-2xl font-bold text-gray-900">
                {user.plan === 'free' ? '免费版' : user.plan === 'pro' ? '专业版' : '企业版'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 历史记录 */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">处理记录</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* 表头 */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-medium text-gray-500 border-b">
            <div className="col-span-1">缩略图</div>
            <div className="col-span-4">文件名</div>
            <div className="col-span-2">大小</div>
            <div className="col-span-3">处理时间</div>
            <div className="col-span-2">状态</div>
          </div>
          {/* 列表 */}
          {mockHistory.map((item) => (
            <div key={item.id} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors items-center">
              <div className="col-span-1 hidden sm:flex">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <Image className="w-5 h-5 text-gray-400" />
                </div>
              </div>
              <div className="sm:col-span-4 flex items-center gap-2">
                <Image className="w-4 h-4 text-gray-400 sm:hidden" />
                <span className="text-sm font-medium text-gray-900 truncate">{item.fileName}</span>
              </div>
              <div className="sm:col-span-2 text-sm text-gray-500">{formatFileSize(item.fileSize)}</div>
              <div className="sm:col-span-3 flex items-center gap-1.5 text-sm text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                {formatDate(item.processedAt)}
              </div>
              <div className="sm:col-span-2">
                {item.status === 'success' ? (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-100 px-2.5 py-1 rounded-full">
                    <CheckCircle className="w-3.5 h-3.5" />
                    成功
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-100 px-2.5 py-1 rounded-full">
                    <XCircle className="w-3.5 h-3.5" />
                    失败
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 升级提示 */}
      {user.plan === 'free' && (
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900">额度快用完了？</h3>
              <p className="text-sm text-gray-500 mt-1">升级到专业版，每月可获得 100 次处理机会</p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors shrink-0"
            >
              查看方案
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
