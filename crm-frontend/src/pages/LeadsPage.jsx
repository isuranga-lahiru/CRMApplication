import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { useApi } from '../hooks/useApi';
import { leadService } from '../services/leadService';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { StatusBadge } from '../components/StatusBadge';
import { LeadForm } from '../components/LeadForm';
import { Loader } from '../components/Loader';
import { EmptyState } from '../components/EmptyState';
import { formatCurrency } from '../utils/formatters';

const ITEMS_PER_PAGE = 10;

export const LeadsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: leadsData, loading, error, refetch } = useApi(() => leadService.getAllLeads(), []);
  const leads = leadsData?.leads || [];

  const salespersonOptions = useMemo(() => {
    return [...new Set(leads.map((lead) => lead.assignedSalesperson).filter(Boolean))];
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        lead.leadName.toLowerCase().includes(query) ||
        lead.companyName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus = !statusFilter || lead.status === statusFilter;
      const matchesSource = !sourceFilter || lead.leadSource === sourceFilter;
      const matchesSalesperson =
        !salespersonFilter || lead.assignedSalesperson === salespersonFilter;

      return matchesSearch && matchesStatus && matchesSource && matchesSalesperson;
    });
  }, [leads, searchTerm, statusFilter, sourceFilter, salespersonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedLeads = filteredLeads.slice(
    (safeCurrentPage - 1) * ITEMS_PER_PAGE,
    safeCurrentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSourceFilter('');
    setSalespersonFilter('');
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setFormError('');
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lead) => {
    setFormError('');
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
    setFormError('');
  };

  const handleSubmitForm = async (formData) => {
    setFormLoading(true);
    setFormError('');

    try {
      if (editingLead) {
        await leadService.updateLead(editingLead._id, formData);
      } else {
        await leadService.createLead(formData);
      }
      closeModal();
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to save lead. Please try again.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteLead = async (id) => {
    const confirmed = window.confirm('Delete this lead? This action cannot be undone.');
    if (!confirmed) return;

    try {
      await leadService.deleteLead(id);
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to delete this lead.');
    }
  };

  const columns = [
    {
      key: 'leadName',
      label: 'Lead',
      render: (value, row) => (
        <button
          onClick={() => navigate(`/leads/${row._id}`)}
          className="font-semibold text-blue-700 transition hover:text-blue-800"
        >
          {value}
        </button>
      ),
    },
    { key: 'companyName', label: 'Company' },
    { key: 'email', label: 'Email' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: 'estimatedDealValue',
      label: 'Deal Value',
      render: (value) => formatCurrency(value),
    },
    { key: 'leadSource', label: 'Source' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant="secondary" className="min-w-20" onClick={() => openEditModal(row)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" className="min-w-20" onClick={() => handleDeleteLead(row._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  if (loading) return <Loader text="Loading leads..." />;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Lead Pipeline Studio</h1>
            <p className="mt-1 text-slate-500">Manage opportunities, statuses, owners, and estimated deal value.</p>
          </div>
          <Button variant="primary" onClick={openCreateModal} className="w-full gap-2 sm:w-auto">
            <FiPlus size={16} />
            New Lead
          </Button>
        </div>

        {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}
        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{formError}</div>
        )}

        <Card className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by name, company, or email"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="app-select"
            >
              <option value="">All Statuses</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>

            <select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="app-select"
            >
              <option value="">All Sources</option>
              <option value="Website">Website</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referral">Referral</option>
              <option value="Cold Email">Cold Email</option>
              <option value="Event">Event</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={salespersonFilter}
              onChange={(e) => {
                setSalespersonFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="app-select"
            >
              <option value="">All Salespersons</option>
              {salespersonOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-sm text-slate-500">
              <FiSearch size={14} />
              {filteredLeads.length} matching lead{filteredLeads.length !== 1 ? 's' : ''}
            </p>
            <Button variant="secondary" onClick={resetFilters}>
              Clear filters
            </Button>
          </div>
        </Card>

        {filteredLeads.length === 0 ? (
          <EmptyState
            icon="🧭"
            title="No leads found"
            description="Try clearing filters or create a new lead."
            action={<Button onClick={openCreateModal}>Create Lead</Button>}
          />
        ) : (
          <>
            <Card className="overflow-hidden p-0">
              <Table columns={columns} data={paginatedLeads} loading={false} emptyMessage="No leads found" />
            </Card>

            {totalPages > 1 && (
              <div className="glass-surface mt-4 flex flex-col items-center justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page {safeCurrentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={safeCurrentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={safeCurrentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingLead ? 'Edit Lead' : 'Create New Lead'} size="xl">
        <LeadForm initialData={editingLead} onSubmit={handleSubmitForm} loading={formLoading} />
      </Modal>
    </MainLayout>
  );
};
