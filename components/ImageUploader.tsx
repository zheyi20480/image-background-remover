'use client';

import { useCallback, useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

const ACCEPT_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

export default function ImageUploader({ onFileSelect, disabled }: ImageUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const validate = (file: File): string | null => {
    if (!ACCEPT_TYPES.includes(file.type)) return '仅支持 JPG、PNG、WebP 格式';
    if (file.size > MAX_SIZE) return '文件大小不能超过 10MB';
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const err = validate(file);
    if (err) { setError(err); return; }
    setError('');
    onFileSelect(file);
  }, [onFileSelect]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${dragging
          ? 'border-indigo-500 bg-indigo-50 scale-[1.02]'
          : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
        }
      `}
    >
      <input ref={inputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={onChange} className="hidden" disabled={disabled} />
      
      <div className="flex flex-col items-center gap-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${dragging ? 'bg-indigo-100' : 'bg-gray-100'}`}>
          {dragging ? (
            <ImageIcon className="w-8 h-8 text-indigo-500" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-lg font-medium text-gray-700">
            {dragging ? '松开即可上传' : '拖拽图片到这里，或点击选择文件'}
          </p>
          <p className="mt-1 text-sm text-gray-400">
            支持 JPG、PNG、WebP 格式，最大 10MB
          </p>
        </div>
      </div>

      {error && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-red-50 text-red-500 text-sm px-4 py-2 rounded-lg border border-red-200">
          {error}
        </div>
      )}
    </div>
  );
}
