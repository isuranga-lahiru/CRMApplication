import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';

export const RecentLeads = ({ leads = [] }) => {
  const navigate = useNavigate();

  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900">Recent Leads</h3>
        <Button variant="secondary" size="sm" onClick={() => navigate('/leads')}>
          View all
        </Button>
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-slate-500">No recent leads available.</p>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <button
              key={lead._id}
              onClick={() => navigate(`/leads/${lead._id}`)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition-colors hover:bg-slate-50"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{lead.leadName}</p>
                <p className="text-xs text-slate-500">{lead.companyName}</p>
              </div>
              <div className="text-right">
                <Badge status={lead.status} />
                <p className="mt-1 text-xs text-slate-500">{formatCurrency(lead.estimatedDealValue)}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
};
