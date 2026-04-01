'use client';

import { useState } from 'react';
import { Download, Palette } from 'lucide-react';

interface DownloadOptionsProps {
  originalName: string;
  resultBlob: Blob | null;
}

export default function DownloadOptions({ originalName, resultBlob }: DownloadOptionsProps) {
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showJpgPicker, setShowJpgPicker] = useState(false);

  if (!resultBlob) return null;

  const baseName = originalName.replace(/\.[^.]+$/, '');

  const downloadPng = () => {
    const url = URL.createObjectURL(resultBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${baseName}_no-bg.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJpg = () => {
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      }
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${baseName}_no-bg.jpg`;
        a.click();
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.92);
    };
    img.src = URL.createObjectURL(resultBlob);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={downloadPng}
        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 active:scale-[0.98] transition-all"
      >
        <Download className="w-5 h-5" />
        下载 PNG（透明背景）
      </button>

      <div className="relative flex-1">
        <button
          onClick={() => setShowJpgPicker(!showJpgPicker)}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 active:scale-[0.98] transition-all"
        >
          <Download className="w-5 h-5" />
          下载 JPG
        </button>

        {showJpgPicker && (
          <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-30">
            <div className="flex items-center gap-3 mb-3">
              <Palette className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">选择背景颜色</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg border-0 cursor-pointer"
              />
              <span className="text-sm text-gray-500">{bgColor}</span>
              <div className="flex gap-2 ml-auto">
                {['#ffffff', '#000000', '#f3f4f6', '#1e3a5f'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setBgColor(c)}
                    className="w-7 h-7 rounded-full border-2 hover:scale-110 transition-transform"
                    style={{ backgroundColor: c, borderColor: bgColor === c ? '#6366f1' : '#e5e7eb' }}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={downloadJpg}
              className="w-full mt-3 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors"
            >
              确认下载 JPG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
