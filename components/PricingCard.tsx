import { Check, X } from 'lucide-react';
import { PricingPlan } from '@/lib/types';

interface PricingCardProps {
  plan: PricingPlan;
}

export default function PricingCard({ plan }: PricingCardProps) {
  return (
    <div className={`relative rounded-2xl p-8 flex flex-col transition-all duration-300 hover:shadow-xl ${
      plan.highlighted
        ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg scale-105 z-10'
        : 'bg-white border border-gray-200 shadow-md'
    }`}>
      {plan.highlighted && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-full">
          最受欢迎
        </div>
      )}

      <h3 className={`text-xl font-bold mb-2 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
        {plan.name}
      </h3>
      <div className="mb-4">
        <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
          {plan.price}
        </span>
        {plan.period && <span className="text-sm ml-1 opacity-70">{plan.period}</span>}
      </div>
      <p className={`text-sm mb-6 ${plan.highlighted ? 'text-indigo-100' : 'text-gray-500'}`}>
        {plan.description}
      </p>

      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm">
            {f.included ? (
              <Check className="w-4 h-4 text-green-400 shrink-0" />
            ) : (
              <X className="w-4 h-4 text-gray-400 shrink-0" />
            )}
            <span className={f.included ? '' : 'opacity-50'}>{f.text}</span>
          </li>
        ))}
      </ul>

      <a
        href={plan.highlighted ? '/register' : undefined}
        className={`block text-center py-3 rounded-xl font-medium transition-all ${
          plan.highlighted
            ? 'bg-white text-indigo-600 hover:bg-gray-100'
            : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
      >
        {plan.price === '免费' ? '立即开始' : '选择方案'}
      </a>
    </div>
  );
}
