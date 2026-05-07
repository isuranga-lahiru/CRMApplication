export const Loader = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div
        className={`animate-spin rounded-full border-4 border-slate-200/80 border-t-cyan-500 ${sizes[size]}`}
      ></div>
      {text && <p className="text-sm font-medium text-slate-500">{text}</p>}
    </div>
  );
};
