import { cn } from '../../utils/cn';

export const Card = ({ children, className = '' }) => {
  return <div className={cn('rounded-2xl border border-slate-200 bg-white shadow-sm', className)}>{children}</div>;
};
