import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatCurrency } from '../../utils/formatters';

export const PipelineColumn = ({ status, leads = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="min-w-[280px] space-y-3">
      <div className="flex items-center justify-between">
        <Badge status={status} />
        <span className="text-xs font-medium text-slate-500">{leads.length}</span>
      </div>

      {leads.length === 0 ? (
        <Card className="p-4">
          <p className="text-sm text-slate-500">No leads in this stage.</p>
        </Card>
      ) : (
        leads.map((lead) => (
          <Card key={lead._id} className="space-y-2 p-4">
            <p className="text-sm font-semibold text-slate-900">{lead.leadName}</p>
            <p className="text-xs text-slate-500">{lead.companyName}</p>
            <p className="text-sm font-medium text-slate-700">{formatCurrency(lead.estimatedDealValue)}</p>
            <Button size="sm" variant="secondary" className="w-full" onClick={() => navigate(`/leads/${lead._id}`)}>
              View Lead
            </Button>
          </Card>
        ))
      )}
    </div>
  );
};
