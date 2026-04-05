// TypeScript 类型定义

export type AppState = "idle" | "uploaded" | "processing" | "done" | "error";

export interface FileInfo {
  file: File;
  preview: string;
  name: string;
  size: number;
  type: string;
}

export interface ProcessResult {
  originalUrl: string;
  processedUrl: string;
  processedBlob: Blob;
}

export interface ApiError {
  message: string;
  code?: string;
  statusCode?: number;
}

export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_FILE_SIZE_LABEL = "10MB";

export const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png,.webp";
