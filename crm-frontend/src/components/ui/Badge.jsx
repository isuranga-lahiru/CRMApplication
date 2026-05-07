import { STATUS_COLORS } from '../../utils/constants';
import { cn } from '../../utils/cn';

export const Badge = ({ status, className = '' }) => {
  const tone = STATUS_COLORS[status] || 'bg-slate-100 text-slate-700 border border-slate-200';

  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', tone, className)}>{status}</span>;
};
