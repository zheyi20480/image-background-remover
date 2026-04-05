"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import UploadZone from "@/components/UploadZone";
import ProcessButton from "@/components/ProcessButton";
import ImagePreview from "@/components/ImagePreview";
import DownloadButton from "@/components/DownloadButton";
import Footer from "@/components/Footer";
import { useState, useCallback } from "react";
import type { AppState, FileInfo, ProcessResult, ApiError } from "@/types";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [result, setResult] = useState<ProcessResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    const preview = URL.createObjectURL(file);
    setFileInfo({
      file,
      preview,
      name: file.name,
      size: file.size,
      type: file.type,
    });
    setAppState("uploaded");
    setResult(null);
    setError(null);
  }, []);

  const handleReset = useCallback(() => {
    if (fileInfo?.preview) {
      URL.revokeObjectURL(fileInfo.preview);
    }
    if (result?.originalUrl) {
      URL.revokeObjectURL(result.originalUrl);
    }
    if (result?.processedUrl) {
      URL.revokeObjectURL(result.processedUrl);
    }
    setFileInfo(null);
    setResult(null);
    setError(null);
    setAppState("idle");
  }, [fileInfo, result]);

  const handleProcess = useCallback(async () => {
    if (!fileInfo) return;

    setAppState("processing");
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", fileInfo.file);

      const response = await fetch("/api/remove-bg", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let errorMessage = "处理失败，请稍后重试";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error?.message || errorMessage;
        } catch {
          // ignore parse errors
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const processedUrl = URL.createObjectURL(blob);

      setResult({
        originalUrl: fileInfo.preview,
        processedUrl,
        processedBlob: blob,
      });
      setAppState("done");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "未知错误，请稍后重试";
      setError(message);
      setAppState("error");
    }
  }, [fileInfo]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />

        <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 -mt-4">
          {/* Upload Zone */}
          {(appState === "idle" || appState === "error") && (
            <div className={appState === "error" ? "animate-fade-in-up" : ""}>
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center text-sm">
                  <span className="font-medium">⚠️ </span>
                  {error}
                </div>
              )}
              <UploadZone onFileSelect={handleFileSelect} />
            </div>
          )}

          {/* File Selected State */}
          {(appState === "uploaded" || appState === "processing") &&
            fileInfo && (
              <div className="animate-fade-in-up">
                <div className="card p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-primary-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 truncate max-w-[240px]">
                          {fileInfo.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {(fileInfo.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleReset}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      title="重新选择"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Preview Image */}
                  <div className="rounded-xl overflow-hidden bg-gray-100 mb-6">
                    <img
                      src={fileInfo.preview}
                      alt="Preview"
                      className="w-full h-auto max-h-[400px] object-contain"
                    />
                  </div>

                  {/* Action Button */}
                  <div className="flex justify-center">
                    <ProcessButton
                      onClick={handleProcess}
                      disabled={appState === "processing"}
                      processing={appState === "processing"}
                    />
                  </div>
                </div>
              </div>
            )}

          {/* Result State */}
          {appState === "done" && result && (
            <div className="animate-fade-in-up">
              <div className="card p-6">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-3">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    背景移除完成！
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    拖动滑块对比效果
                  </p>
                </div>

                {/* Before/After Slider */}
                <ImagePreview
                  originalUrl={result.originalUrl}
                  processedUrl={result.processedUrl}
                />

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                  <DownloadButton
                    blob={result.processedBlob}
                    originalName={fileInfo?.name || "image"}
                  />
                  <button onClick={handleReset} className="btn-secondary">
                    处理新图片
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
