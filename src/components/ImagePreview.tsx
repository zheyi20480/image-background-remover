import BeforeAfterSlider from "./BeforeAfterSlider";

interface ImagePreviewProps {
  originalUrl: string;
  processedUrl: string;
}

export default function ImagePreview({
  originalUrl,
  processedUrl,
}: ImagePreviewProps) {
  return (
    <div className="animate-fade-in-up">
      <BeforeAfterSlider
        originalUrl={originalUrl}
        processedUrl={processedUrl}
      />
    </div>
  );
}
