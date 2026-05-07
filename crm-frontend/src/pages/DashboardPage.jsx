import { FiDollarSign, FiTarget, FiTrendingDown, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useApi } from '../hooks/useApi';
import { dashboardService } from '../services/dashboardService';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { Loader } from '../components/Loader';
import { formatCurrency, formatNumber } from '../utils/formatters';

export const DashboardPage = () => {
  const { data: stats, loading, error } = useApi(() =>
    dashboardService.getStats(),
    []
  );

  const statCards = [
    {
      title: 'Total Leads',
      value: stats?.totalLeads || 0,
      icon: FiUsers,
    },
    {
      title: 'New Leads',
      value: stats?.newLeads || 0,
      icon: FiTarget,
    },
    {
      title: 'Qualified Leads',
      value: stats?.qualifiedLeads || 0,
      icon: FiTrendingUp,
    },
    {
      title: 'Won Deals',
      value: stats?.wonDeals || 0,
      icon: FiTrendingUp,
    },
    {
      title: 'Lost Deals',
      value: stats?.lostDeals || 0,
      icon: FiTrendingDown,
    },
    {
      title: 'Total Deal Value',
      value: stats?.totalDealValue || 0,
      isCurrency: true,
      icon: FiDollarSign,
    },
    {
      title: 'Won Deals Value',
      value: stats?.wonDealsValue || stats?.wonValue || 0,
      isCurrency: true,
      icon: FiDollarSign,
    },
  ];

  if (loading) return <Loader text="Loading dashboard..." />;

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Executive Dashboard</h1>
        <p className="mt-2 text-slate-500">Track lead quality and pipeline performance with a clean, real-time view.</p>
      </div>

      {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, index) => (
          <Card key={index} className="h-full p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{stat.title}</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {stat.isCurrency
                    ? formatCurrency(stat.value)
                    : formatNumber(stat.value)}
                </p>
              </div>
              <div className="rounded-xl border border-blue-200/60 bg-blue-100/70 p-3 text-blue-700">
                <stat.icon size={20} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="glass-surface mt-8 rounded-2xl p-6">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Productivity Tips</h2>
        <ul className="space-y-1 text-sm text-slate-600">
          <li>• Navigate to Leads page to manage your leads</li>
          <li>• Create new leads or update existing ones</li>
          <li>• Track deal values and lead status</li>
          <li>• Add notes to leads for better collaboration</li>
        </ul>
      </div>
    </MainLayout>
  );
};
