"use client";

import { useCallback, useRef, useState } from "react";
import {
  ACCEPTED_IMAGE_TYPES,
  ACCEPTED_EXTENSIONS,
  MAX_FILE_SIZE,
  MAX_FILE_SIZE_LABEL,
} from "@/types";

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function UploadZone({ onFileSelect }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return `不支持的文件格式，请上传 ${ACCEPTED_EXTENSIONS.split(",").join("、").toUpperCase()} 文件`;
      }
      if (file.size > MAX_FILE_SIZE) {
        return `文件大小不能超过 ${MAX_FILE_SIZE_LABEL}`;
      }
      return null;
    },
    []
  );

  const handleFile = useCallback(
    (file: File) => {
      const error = validateFile(file);
      if (error) {
        setDragError(error);
        return;
      }
      setDragError(null);
      onFileSelect(file);
    },
    [validateFile, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
    setDragError(null);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFile(files[0]);
      }
    },
    [handleFile]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
      // Reset input so the same file can be re-selected
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [handleFile]
  );

  return (
    <div className="card p-8 sm:p-12">
      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={`
          relative border-2 border-dashed rounded-2xl p-8 sm:p-16
          cursor-pointer transition-all duration-300 ease-in-out
          flex flex-col items-center justify-center
          ${
            isDragOver
              ? "border-primary-400 bg-primary-50 scale-[1.02] shadow-lg shadow-primary-100"
              : "border-gray-200 bg-gray-50/50 hover:border-primary-300 hover:bg-primary-50/30"
          }
        `}
      >
        {/* Upload Icon */}
        <div
          className={`
          w-20 h-20 rounded-2xl flex items-center justify-center mb-6
          transition-all duration-300
          ${
            isDragOver
              ? "bg-primary-100 scale-110"
              : "bg-primary-50 group-hover:bg-primary-100"
          }
        `}
        >
          <svg
            className={`w-10 h-10 transition-colors duration-300 ${
              isDragOver ? "text-primary-600" : "text-primary-400"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700 mb-2">
          {isDragOver ? "松开鼠标上传图片" : "拖拽图片到这里"}
        </p>
        <p className="text-sm text-gray-400 mb-6">
          或者 <span className="text-primary-500 font-medium">点击选择文件</span>
        </p>

        {/* Format Info */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-gray-400">
          <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200">
            JPG
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200">
            PNG
          </span>
          <span className="px-2.5 py-1 rounded-full bg-white border border-gray-200">
            WebP
          </span>
          <span className="text-gray-300">·</span>
          <span>最大 {MAX_FILE_SIZE_LABEL}</span>
        </div>

        {/* Hidden File Input */}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>

      {/* Error Message */}
      {dragError && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-500 text-sm text-center">
          <span className="font-medium">⚠️ </span>
          {dragError}
        </div>
      )}
    </div>
  );
}
