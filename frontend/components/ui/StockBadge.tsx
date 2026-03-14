interface StockBadgeProps {
  status: 'in_stock' | 'limited' | 'out_of_stock';
  className?: string;
}

const config = {
  in_stock: { label: 'In Stock', dot: 'bg-success' },
  limited: { label: 'Limited', dot: 'bg-warning' },
  out_of_stock: { label: 'Out of Stock', dot: 'bg-danger' },
};

export function StockBadge({ status, className = '' }: StockBadgeProps) {
  const { label, dot } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium badge-${status.replace(/_/g, '-')} ${className}`}>
      <span className={`w-1 h-1 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
