'use client';

import { useState, useCallback } from 'react';
import ImageUploader from '@/components/ImageUploader';
import ImageCompare from '@/components/ImageCompare';
import DownloadOptions from '@/components/DownloadOptions';
import { Loader2, RotateCcw, AlertCircle } from 'lucide-react';

type Step = 'upload' | 'processing' | 'result' | 'error';

export default function RemovePage() {
  const [step, setStep] = useState<Step>('upload');
  const [file, setFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileSelect = useCallback((f: File) => {
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl('');
    setResultBlob(null);
    setErrorMsg('');
    setStep('upload');
  }, []);

  const handleProcess = async () => {
    if (!file) return;
    setStep('processing');
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch('/api/remove-bg', { method: 'POST', body: formData });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: '处理失败' }));
        throw new Error(err.error || '处理失败');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultBlob(blob);
      setStep('result');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : '处理失败，请重试');
      setStep('error');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setFile(null);
    setOriginalUrl('');
    setResultUrl('');
    setResultBlob(null);
    setErrorMsg('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">在线抠图工具</h1>
        <p className="mt-3 text-gray-500">上传图片，一键移除背景</p>
      </div>

      {/* 上传步骤 */}
      {step === 'upload' && (
        <div className="space-y-6">
          <ImageUploader onFileSelect={handleFileSelect} />
          {file && originalUrl && (
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-gray-100 max-h-96">
                <img src={originalUrl} alt="预览" className="w-full h-full object-contain max-h-96" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    重新选择
                  </button>
                  <button
                    onClick={handleProcess}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-md"
                  >
                    开始处理
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 处理中 */}
      {step === 'processing' && (
        <div className="text-center py-20">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200" />
            <Loader2 className="w-20 h-20 text-indigo-600 animate-spin" />
          </div>
          <p className="text-xl font-semibold text-gray-700">正在处理中...</p>
          <p className="mt-2 text-gray-400">AI 正在智能识别并移除背景，请稍候</p>
        </div>
      )}

      {/* 结果展示 */}
      {step === 'result' && resultUrl && (
        <div className="space-y-6">
          <ImageCompare originalUrl={originalUrl} resultUrl={resultUrl} />
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">拖动滑块对比原图和抠图效果</p>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              处理新图片
            </button>
          </div>
          <DownloadOptions originalName={file?.name || 'image.png'} resultBlob={resultBlob} />
        </div>
      )}

      {/* 错误 */}
      {step === 'error' && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-xl font-semibold text-gray-700 mb-2">处理失败</p>
          <p className="text-gray-500 mb-6">{errorMsg}</p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            重新上传
          </button>
        </div>
      )}
    </div>
  );
}
