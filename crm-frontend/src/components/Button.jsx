export const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center rounded-xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/35 disabled:cursor-not-allowed disabled:opacity-60';

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-700/25 hover:from-blue-700 hover:to-cyan-600',
    secondary:
      'border border-slate-300/60 bg-white/75 text-slate-700 hover:bg-white',
    danger:
      'bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-md shadow-red-700/25 hover:from-red-700 hover:to-rose-600',
    success:
      'bg-gradient-to-r from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-700/25 hover:from-emerald-700 hover:to-teal-600',
    ghost:
      'text-slate-700 hover:bg-slate-100/80 disabled:text-slate-400',
  };

  const sizes = {
    sm: 'h-9 px-3.5',
    md: 'h-11 px-5',
    lg: 'h-12 px-6 text-base',
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClassName}
      {...props}
    >
      {children}
    </button>
  );
};
