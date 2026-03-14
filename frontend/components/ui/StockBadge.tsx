interface StockBadgeProps {
  status: 'in_stock' | 'limited' | 'out_of_stock';
  className?: string;
}

const labels = {
  in_stock: 'In Stock',
  limited: 'Limited',
  out_of_stock: 'Out of Stock',
};

export function StockBadge({ status, className = '' }: StockBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium badge-${status.replace('_', '-')} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'in_stock' ? 'bg-green-500' : status === 'limited' ? 'bg-yellow-500' : 'bg-red-500'
      }`} />
      {labels[status]}
    </span>
  );
}
