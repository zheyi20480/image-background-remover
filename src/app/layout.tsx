import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QuickBG - 在线图片背景移除工具",
  description:
    "快速、简单、一键移除图片背景。支持 JPG、PNG、WebP 格式，AI 智能抠图，秒级出结果。",
  keywords: ["背景移除", "抠图", "AI", "图片处理", "transparent background"],
  openGraph: {
    title: "QuickBG - 在线图片背景移除工具",
    description: "快速、简单、一键移除背景",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
