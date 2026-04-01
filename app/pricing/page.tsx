'use client';

import { useState } from 'react';
import PricingCard from '@/components/PricingCard';
import Link from 'next/link';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { PricingPlan, FAQ } from '@/lib/types';

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
      { text: '优先支持', included: false },
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
      { text: '优先支持', included: false },
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
      { text: 'API 访问', included: true },
      { text: '优先支持', included: true },
    ],
  },
];

const faqs: FAQ[] = [
  {
    question: '免费版有什么限制？',
    answer: '免费版每月可以处理 5 张图片，输出标准质量。对于日常使用已经足够，如果需要更多处理次数或更高质量，可以考虑升级到专业版。',
  },
  {
    question: '支持哪些图片格式？',
    answer: '我们支持上传 JPG、PNG 和 WebP 格式的图片。处理完成后可以下载为 PNG（透明背景）或 JPG（自定义背景色）格式。',
  },
  {
    question: '处理后的图片质量如何？',
    answer: '免费版提供标准质量输出，专业版支持高清输出，企业版支持 4K 超高清输出。所有版本都使用 AI 智能抠图，边缘处理精细自然。',
  },
  {
    question: '上传的图片安全吗？',
    answer: '绝对安全。我们不会存储您上传的图片，处理完成后图片数据会立即删除。所有数据传输使用 HTTPS 加密。',
  },
  {
    question: '可以取消订阅吗？',
    answer: '当然可以。您可以随时取消订阅，取消后当月剩余的使用次数仍然有效。我们不会自动续费，也不会收取任何额外费用。',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* 页头 */}
      <section className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900">选择适合你的方案</h1>
          <p className="mt-4 text-lg text-gray-500">简单透明的定价，按需升级，随时取消</p>
        </div>
      </section>

      {/* 定价卡片 */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
            {plans.map((plan) => (
              <PricingCard key={plan.name} plan={plan} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <HelpCircle className="w-10 h-10 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">常见问题</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-gray-500 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">还有其他问题？</h2>
          <p className="text-gray-500 mb-6">我们的客服团队随时为您解答</p>
          <Link
            href="/remove"
            className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            立即免费体验
          </Link>
        </div>
      </section>
    </div>
  );
}
