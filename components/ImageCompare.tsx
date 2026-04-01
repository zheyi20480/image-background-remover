'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { GripVertical } from 'lucide-react';

interface ImageCompareProps {
  originalUrl: string;
  resultUrl: string;
}

export default function ImageCompare({ originalUrl, resultUrl }: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPositionFromEvent = useCallback((clientX: number) => {
    if (!containerRef.current) return 50;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    return Math.min(100, Math.max(0, (x / rect.width) * 100));
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setPosition(getPositionFromEvent(e.clientX));
  }, [getPositionFromEvent]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    e.preventDefault();
    setPosition(getPositionFromEvent(e.clientX));
  }, [getPositionFromEvent]);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  useEffect(() => {
    const onGlobalUp = () => { dragging.current = false; };
    window.addEventListener('pointerup', onGlobalUp);
    return () => window.removeEventListener('pointerup', onGlobalUp);
  }, []);

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg select-none" ref={containerRef}>
      {/* 底层：处理结果（抠图后） */}
      <div className="relative w-full aspect-video bg-checkerboard">
        <img
          src={resultUrl}
          alt="处理结果"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* 上层：原图，通过 clip-path 裁切 */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="w-full h-full">
          <img
            src={originalUrl}
            alt="原始图片"
            className="absolute inset-0 w-full h-full object-contain"
            draggable={false}
          />
        </div>
      </div>

      {/* 分割线 */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* 拖拽手柄 */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center cursor-ew-resize touch-none"
        >
          <GripVertical className="w-5 h-5 text-gray-600" />
        </div>
      </div>

      {/* 标签 */}
      <div className="absolute top-3 left-3 bg-black/50 text-white text-xs px-2 py-1 rounded z-20">
        原图
      </div>
      <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded z-20">
        抠图结果
      </div>
    </div>
  );
}
