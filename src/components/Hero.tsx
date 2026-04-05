export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-br from-primary-200/40 via-accent-200/20 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          AI 驱动，秒级处理
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          <span className="gradient-text">QuickBG</span>
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          在线图片背景移除工具
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-2">
          快速、简单、一键移除背景
        </p>
        <p className="text-sm text-gray-400">
          上传图片即可自动去除背景 · 免费 · 无需注册
        </p>
      </div>
    </section>
  );
}
