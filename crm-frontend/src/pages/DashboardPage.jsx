import { FiDollarSign, FiTarget, FiTrendingDown, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { dashboardService } from '../services/dashboardService';
import { leadService } from '../services/leadService';
import { useApi } from '../hooks/useApi';
import { formatCurrency, formatNumber } from '../utils/formatters';
import { SectionHeader } from '../components/layout/SectionHeader';
import { StatsCard } from '../components/dashboard/StatsCard';
import { RecentLeads } from '../components/dashboard/RecentLeads';
import { Card } from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';

export const DashboardPage = () => {
  const { data: stats, loading, error } = useApi(() => dashboardService.getStats(), []);
  const { data: leadsData, loading: leadsLoading } = useApi(() => leadService.getAllLeads(), []);
  const recentLeads = (leadsData?.leads || []).slice(0, 5);

  const statCards = [
    { title: 'Total Leads', value: formatNumber(stats?.totalLeads || 0), icon: FiUsers, trend: 'Pipeline overview' },
    { title: 'New Leads', value: formatNumber(stats?.newLeads || 0), icon: FiTarget, trend: 'Fresh opportunities' },
    { title: 'Qualified Leads', value: formatNumber(stats?.qualifiedLeads || 0), icon: FiTrendingUp, trend: 'High intent prospects' },
    { title: 'Won Leads', value: formatNumber(stats?.wonDeals || 0), icon: FiTrendingUp, trend: 'Closed successfully' },
    { title: 'Lost Leads', value: formatNumber(stats?.lostDeals || 0), icon: FiTrendingDown, trend: 'Need follow-up improvements' },
    { title: 'Total Deal Value', value: formatCurrency(stats?.totalDealValue || 0), icon: FiDollarSign, trend: 'Estimated pipeline value' },
    { title: 'Won Deal Value', value: formatCurrency(stats?.wonDealsValue || stats?.wonValue || 0), icon: FiDollarSign, trend: 'Revenue closed' },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <SectionHeader title="Dashboard" description="Monitor lead health, outcomes, and deal value at a glance." />

        {error && <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {loading
            ? Array.from({ length: 7 }).map((_, index) => (
                <Card key={index} className="p-5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="mt-3 h-8 w-28" />
                  <Skeleton className="mt-3 h-3 w-32" />
                </Card>
              ))
            : statCards.map((stat) => <StatsCard key={stat.title} {...stat} />)}
        </div>

        {leadsLoading ? (
          <Card className="p-5">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="mt-4 h-14 w-full" />
            <Skeleton className="mt-3 h-14 w-full" />
            <Skeleton className="mt-3 h-14 w-full" />
          </Card>
        ) : (
          <RecentLeads leads={recentLeads} />
        )}
      </div>
    </MainLayout>
  );
};
