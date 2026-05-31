interface LoadingOverlayProps {
  isVisible: boolean;
}

export function LoadingOverlay({ isVisible }: LoadingOverlayProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-2 border-border-2" />
        <div className="absolute inset-0 animate-ring-spin rounded-full border-2 border-transparent border-t-gold" />
      </div>
      <div className="mt-6 font-mono text-sm tracking-wider text-muted animate-pulse-soft">
        fetching real X data...
      </div>
    </div>
  );
}
