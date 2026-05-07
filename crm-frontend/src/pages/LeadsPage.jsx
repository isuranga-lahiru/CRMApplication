import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiPlus, FiSearch } from 'react-icons/fi';
import { MainLayout } from '../layouts/MainLayout';
import { leadService } from '../services/leadService';
import { useApi } from '../hooks/useApi';
import { formatCurrency } from '../utils/formatters';
import { LEAD_SOURCE_OPTIONS, LEAD_STATUS_OPTIONS } from '../utils/constants';
import { SectionHeader } from '../components/layout/SectionHeader';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Table } from '../components/ui/Table';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { LeadForm } from '../components/leads/LeadForm';

const ITEMS_PER_PAGE = 10;

export const LeadsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [salespersonFilter, setSalespersonFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [deletingLeadId, setDeletingLeadId] = useState('');
  const [deleting, setDeleting] = useState(false);

  const { data: leadsData, loading, error, refetch } = useApi(() => leadService.getAllLeads(), []);
  const leads = leadsData?.leads || [];

  const salespersonOptions = useMemo(() => [...new Set(leads.map((lead) => lead.assignedSalesperson).filter(Boolean))], [leads]);

  const filteredLeads = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return leads.filter((lead) => {
      const matchesSearch =
        !query ||
        lead.leadName.toLowerCase().includes(query) ||
        lead.companyName.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query);

      const matchesStatus = !statusFilter || lead.status === statusFilter;
      const matchesSource = !sourceFilter || lead.leadSource === sourceFilter;
      const matchesSalesperson = !salespersonFilter || lead.assignedSalesperson === salespersonFilter;
      return matchesSearch && matchesStatus && matchesSource && matchesSalesperson;
    });
  }, [leads, searchTerm, statusFilter, sourceFilter, salespersonFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedLeads = filteredLeads.slice((safeCurrentPage - 1) * ITEMS_PER_PAGE, safeCurrentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setSourceFilter('');
    setSalespersonFilter('');
    setCurrentPage(1);
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setFormError('');
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

  const confirmDelete = async () => {
    if (!deletingLeadId) return;
    setDeleting(true);
    try {
      await leadService.deleteLead(deletingLeadId);
      setDeletingLeadId('');
      refetch();
    } catch (err) {
      setFormError(err.response?.data?.message || 'Unable to delete lead.');
    } finally {
      setDeleting(false);
    }
  };

  const columns = [
    {
      key: 'leadName',
      label: 'Lead',
      render: (value, row) => (
        <button onClick={() => navigate(`/leads/${row._id}`)} className="font-medium text-slate-900 hover:text-slate-700">
          {value}
        </button>
      ),
    },
    { key: 'companyName', label: 'Company' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status', render: (value) => <Badge status={value} /> },
    { key: 'estimatedDealValue', label: 'Deal Value', render: (value) => formatCurrency(value) },
    { key: 'leadSource', label: 'Source' },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="secondary" onClick={() => navigate(`/leads/${row._id}`)}>
            <FiEye size={14} />
          </Button>
          <Button size="sm" variant="secondary" onClick={() => openEditModal(row)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => setDeletingLeadId(row._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <SectionHeader
          title="Leads"
          description="Search, filter, and manage your lead pipeline."
          action={
            <Button onClick={openCreateModal}>
              <FiPlus size={14} />
              New Lead
            </Button>
          }
        />

        {(error || formError) && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error || formError}</div>
        )}

        <Card className="p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
            <div className="xl:col-span-2">
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search lead, company, or email"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All statuses</option>
              {LEAD_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Select
              value={sourceFilter}
              onChange={(e) => {
                setSourceFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All sources</option>
              {LEAD_SOURCE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            <Select
              value={salespersonFilter}
              onChange={(e) => {
                setSalespersonFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All salespersons</option>
              {salespersonOptions.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm text-slate-500">
              <FiSearch size={14} />
              {filteredLeads.length} lead{filteredLeads.length === 1 ? '' : 's'} found
            </p>
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              Clear
            </Button>
          </div>
        </Card>

        {filteredLeads.length === 0 && !loading ? (
          <EmptyState
            title="No leads found"
            description="Try changing filters or create a new lead."
            action={<Button onClick={openCreateModal}>Create Lead</Button>}
          />
        ) : (
          <Card className="overflow-hidden">
            <Table columns={columns} data={paginatedLeads} loading={loading} />
          </Card>
        )}

        {totalPages > 1 && (
          <Card className="flex flex-col items-center justify-between gap-3 p-3 sm:flex-row">
            <p className="text-sm text-slate-500">
              Page {safeCurrentPage} of {totalPages}
            </p>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>
                Previous
              </Button>
              <Button
                variant="secondary"
                size="sm"
                disabled={safeCurrentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          </Card>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingLead ? 'Edit Lead' : 'Create Lead'} size="xl">
        <LeadForm initialData={editingLead} onSubmit={handleSubmitForm} loading={formLoading} />
      </Modal>

      <ConfirmDialog
        isOpen={Boolean(deletingLeadId)}
        onClose={() => setDeletingLeadId('')}
        onConfirm={confirmDelete}
        loading={deleting}
        title="Delete lead"
        message="This action cannot be undone. Are you sure you want to remove this lead?"
        confirmText="Delete"
      />
    </MainLayout>
  );
};
