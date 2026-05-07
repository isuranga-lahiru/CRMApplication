import { STATUS_COLORS } from '../utils/constants';

export const StatusBadge = ({ status }) => {
  const colorClass = STATUS_COLORS[status] || 'border border-slate-300 bg-slate-100/80 text-slate-700';

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}>
      {status}
    </span>
  );
};
