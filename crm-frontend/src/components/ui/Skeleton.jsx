import { cn } from '../../utils/cn';

export const Skeleton = ({ className = '' }) => {
  return <div className={cn('animate-pulse rounded-xl bg-slate-200/70', className)} />;
};
