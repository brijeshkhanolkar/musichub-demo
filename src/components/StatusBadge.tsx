interface StatusBadgeProps {
  status: string;
}

const statusStyles: Record<string, string> = {
  PENDING: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400',
  CONFIRMED: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400',
  ACTIVE: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
  RETURNED: 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[status] || 'bg-surface-100 text-surface-600'}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'PENDING' ? 'bg-amber-500' :
        status === 'CONFIRMED' ? 'bg-emerald-500' :
        status === 'ACTIVE' ? 'bg-blue-500' :
        status === 'RETURNED' ? 'bg-surface-400' :
        status === 'CANCELLED' ? 'bg-red-500' : 'bg-surface-400'
      }`} />
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </span>
  );
}
