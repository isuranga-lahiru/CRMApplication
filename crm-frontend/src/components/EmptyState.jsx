export const EmptyState = ({
  icon = '📭',
  title = 'No Data',
  description = 'There is no data to display.',
  action,
}) => {
  return (
    <div className="glass-surface rounded-2xl border border-dashed border-slate-300/80 px-4 py-12 text-center">
      <div className="mb-4 text-5xl">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mx-auto mb-6 max-w-sm text-slate-500">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
