import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg text-indigo-600 mb-3">
              <Sparkles className="w-5 h-5" />
              QuickBG
            </div>
            <p className="text-gray-500 text-sm">
              快速、简单、无需安装软件的在线抠图服务。AI 驱动，一键去除图片背景。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">产品</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="/remove" className="hover:text-indigo-600 transition-colors">在线抠图</a></li>
              <li><a href="/pricing" className="hover:text-indigo-600 transition-colors">定价方案</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API 文档</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">支持</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">帮助中心</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">联系我们</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">隐私政策</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} QuickBG. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
