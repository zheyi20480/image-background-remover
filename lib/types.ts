// 类型定义

export interface User {
  email: string;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  credits: number;
  token: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  highlighted?: boolean;
}

export interface ProcessHistory {
  id: string;
  fileName: string;
  fileSize: number;
  status: 'success' | 'failed';
  processedAt: string;
  thumbnail?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
