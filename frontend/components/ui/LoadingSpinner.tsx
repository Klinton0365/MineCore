export function LoadingSpinner({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="w-8 h-8 border-2 border-[var(--color-accent-blue)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
