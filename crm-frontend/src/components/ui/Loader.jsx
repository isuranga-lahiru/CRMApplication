export const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-3">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-slate-200 border-t-slate-700" />
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
};
