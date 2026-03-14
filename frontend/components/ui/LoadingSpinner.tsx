export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-6 h-6 border-[1.5px] border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
    </div>
  );
}
