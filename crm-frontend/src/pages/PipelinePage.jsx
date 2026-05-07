import { MainLayout } from '../layouts/MainLayout';
import { SectionHeader } from '../components/layout/SectionHeader';
import { PipelineColumn } from '../components/leads/PipelineColumn';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';
import { useApi } from '../hooks/useApi';
import { leadService } from '../services/leadService';
import { LEAD_STATUS_OPTIONS } from '../utils/constants';

export const PipelinePage = () => {
  const { data: leadsData, loading, error } = useApi(() => leadService.getAllLeads(), []);
  const leads = leadsData?.leads ?? [];

  const groupedLeads = LEAD_STATUS_OPTIONS.reduce((acc, option) => {
    acc[option.value] = leads.filter((lead) => lead.status === option.value);
    return acc;
  }, {});

  return (
    <MainLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Sales Pipeline"
          description="Track leads by stage with a clear pipeline view."
        />

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="p-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="mt-3 h-16 w-full" />
                <Skeleton className="mt-3 h-16 w-full" />
              </Card>
            ))}
          </div>
        ) : leads.length === 0 ? (
          <EmptyState title="No leads in pipeline" description="Create leads first to visualize your sales pipeline." />
        ) : (
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {LEAD_STATUS_OPTIONS.map((option) => (
                <PipelineColumn key={option.value} status={option.value} leads={groupedLeads[option.value] || []} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
