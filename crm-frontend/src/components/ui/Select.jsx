import { cn } from '../../utils/cn';

export const Select = ({
  label,
  error,
  className = '',
  id,
  name,
  children,
  required = false,
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-rose-600">*</span>}
        </label>
      )}
      <select
        id={inputId}
        name={name}
        className={cn(
          'h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200',
          error && 'border-rose-300 focus:border-rose-400 focus:ring-rose-200',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
    </div>
  );
};
