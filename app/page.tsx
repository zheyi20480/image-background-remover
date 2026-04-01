import Link from 'next/link';
import PricingCard from '@/components/PricingCard';
import { PricingPlan } from '@/lib/types';
import { Sparkles, Zap, ImageOff, FileDown, ArrowRight, Star } from 'lucide-react';

const plans: PricingPlan[] = [
  {
    name: '免费版',
    price: '免费',
    period: '',
    description: '适合偶尔使用，体验基础功能',
    features: [
      { text: '每月 5 次免费处理', included: true },
      { text: '标准质量输出', included: true },
      { text: 'JPG / PNG 格式下载', included: true },
      { text: '批量处理', included: false },
      { text: 'API 访问', included: false },
    ],
  },
  {
    name: '专业版',
    price: '¥29',
    period: '/月',
    description: '适合电商卖家和内容创作者',
    highlighted: true,
    features: [
      { text: '每月 100 次处理', included: true },
      { text: '高清质量输出', included: true },
      { text: '所有格式下载', included: true },
      { text: '批量处理（最多5张）', included: true },
      { text: 'API 访问', included: false },
    ],
  },
  {
    name: '企业版',
    price: '¥99',
    period: '/月',
    description: '适合团队和企业用户',
    features: [
      { text: '无限次处理', included: true },
      { text: '4K 超高清输出', included: true },
      { text: '所有格式下载', included: true },
      { text: '批量处理（无限）', included: true },
      { text: 'API 访问 + 优先支持', included: true },
    ],
  },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero 区域 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdi0yMGgtNjB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNlMGU3ZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Star className="w-4 h-4" />
              AI 驱动，秒级处理
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
              一键移除
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> 图片背景</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              上传图片，AI 自动去除背景。支持多种格式下载，无需安装任何软件，打开浏览器即可使用。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/remove"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-600 text-white text-lg font-semibold rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-lg shadow-indigo-200"
              >
                免费开始使用
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 text-lg font-semibold rounded-xl border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-all"
              >
                查看定价
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 功能展示 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">为什么选择 QuickBG？</h2>
            <p className="mt-4 text-gray-500 text-lg">简单三步，轻松搞定</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-indigo-200 transition-colors">
                <Zap className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">快速处理</h3>
              <p className="text-gray-500 leading-relaxed">
                上传图片后 AI 自动处理，平均 5 秒内完成背景移除，无需等待。
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-indigo-200 transition-colors">
                <ImageOff className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">高清输出</h3>
              <p className="text-gray-500 leading-relaxed">
                支持最高 4K 分辨率输出，边缘精细处理，专业级抠图效果。
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-indigo-50 transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-indigo-200 transition-colors">
                <FileDown className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">多种格式</h3>
              <p className="text-gray-500 leading-relaxed">
                支持 PNG 透明背景、JPG 自定义背景色下载，满足各种使用场景。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 定价预览 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">简洁透明的定价</h2>
            <p className="mt-4 text-gray-500 text-lg">免费开始，按需升级</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">准备好开始了吗？</h2>
          <p className="text-lg text-indigo-100 mb-8">
            注册即可获得 5 次免费处理机会，无需绑定信用卡
          </p>
          <Link
            href="/remove"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-600 text-lg font-semibold rounded-xl hover:bg-gray-100 active:scale-[0.98] transition-all"
          >
            立即免费体验
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
