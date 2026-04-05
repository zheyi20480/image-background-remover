"use client";

interface ProcessButtonProps {
  onClick: () => void;
  disabled: boolean;
  processing: boolean;
}

export default function ProcessButton({
  onClick,
  disabled,
  processing,
}: ProcessButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="btn-primary flex items-center gap-2 text-base min-w-[200px] justify-center"
    >
      {processing ? (
        <>
          {/* Spinner */}
          <div className="relative w-5 h-5">
            <div className="absolute inset-0 rounded-full border-2 border-white/30" />
            <div className="absolute inset-0 rounded-full border-2 border-white border-t-transparent animate-spin" />
          </div>
          <span>处理中...</span>
        </>
      ) : (
        <>
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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <span>开始处理</span>
        </>
      )}
    </button>
  );
}
