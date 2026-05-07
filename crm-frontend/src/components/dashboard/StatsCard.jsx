import { Card } from '../ui/Card';

export const StatsCard = ({ title, value, icon: Icon, trend }) => {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
          {trend && <p className="mt-2 text-xs text-slate-500">{trend}</p>}
        </div>
        <div className="rounded-xl bg-slate-100 p-2.5 text-slate-700">
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
};
