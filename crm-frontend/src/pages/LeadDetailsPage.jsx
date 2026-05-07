import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { useApi } from '../hooks/useApi';
import { leadService } from '../services/leadService';
import { noteService } from '../services/noteService';
import { formatCurrency, formatDate } from '../utils/formatters';
import { LEAD_STATUS_OPTIONS } from '../utils/constants';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { Loader } from '../components/ui/Loader';
import { Badge } from '../components/ui/Badge';
import { NoteForm } from '../components/leads/NoteForm';
import { NoteList } from '../components/leads/NoteList';

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [noteError, setNoteError] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [statusError, setStatusError] = useState('');

  const { data: lead, loading, error, refetch } = useApi(() => leadService.getLeadById(id), [id]);

  useEffect(() => {
    const fetchNotes = async () => {
      setLoadingNotes(true);
      try {
        const response = await noteService.getNotes(id);
        setNotes(response.notes || []);
      } finally {
        setLoadingNotes(false);
      }
    };
    if (id) fetchNotes();
  }, [id]);

  const handleAddNote = async (noteData) => {
    setAddingNote(true);
    setNoteError('');
    try {
      const response = await noteService.addNote(id, noteData.content, noteData.createdBy);
      setNotes((prev) => [response.note, ...prev]);
    } catch (err) {
      setNoteError(err.response?.data?.message || 'Unable to add note.');
    } finally {
      setAddingNote(false);
    }
  };

  const handleStatusChange = async (value) => {
    if (!lead || value === lead.status) return;
    setStatusUpdating(true);
    setStatusError('');
    try {
      await leadService.updateLead(id, { status: value });
      refetch();
    } catch (err) {
      setStatusError(err.response?.data?.message || 'Unable to update status.');
    } finally {
      setStatusUpdating(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <Loader text="Loading lead details..." />
      </MainLayout>
    );
  }

  if (error || !lead) {
    return (
      <MainLayout>
        <Card className="p-6">
          <p className="text-sm text-rose-700">{error || 'Lead not found.'}</p>
          <Button className="mt-3" variant="secondary" onClick={() => navigate('/leads')}>
            Back to Leads
          </Button>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Button variant="ghost" size="sm" onClick={() => navigate('/leads')}>
              Back to Leads
            </Button>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900">{lead.leadName}</h1>
            <p className="text-sm text-slate-500">{lead.companyName}</p>
          </div>
          <Badge status={lead.status} />
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            <Card className="p-5">
              <h3 className="mb-4 text-base font-semibold text-slate-900">Lead Profile</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase text-slate-400">Email</p>
                  <p className="mt-1 text-sm text-slate-800">{lead.email}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Phone</p>
                  <p className="mt-1 text-sm text-slate-800">{lead.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Assigned Salesperson</p>
                  <p className="mt-1 text-sm text-slate-800">{lead.assignedSalesperson}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Lead Source</p>
                  <p className="mt-1 text-sm text-slate-800">{lead.leadSource}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Estimated Value</p>
                  <p className="mt-1 text-sm text-slate-800">{formatCurrency(lead.estimatedDealValue)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase text-slate-400">Created Date</p>
                  <p className="mt-1 text-sm text-slate-800">{formatDate(lead.createdAt)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 text-base font-semibold text-slate-900">Add Note</h3>
              {noteError && <p className="mb-3 rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{noteError}</p>}
              <NoteForm loading={addingNote} onSubmit={handleAddNote} currentUserName={lead.assignedSalesperson} />
            </Card>

            <Card className="p-5">
              <h3 className="mb-3 text-base font-semibold text-slate-900">Notes Timeline</h3>
              <NoteList notes={notes} loading={loadingNotes} />
            </Card>
          </div>

          <div className="space-y-5">
            <Card className="p-5">
              <h3 className="mb-3 text-base font-semibold text-slate-900">Status</h3>
              <Select value={lead.status} onChange={(e) => handleStatusChange(e.target.value)} disabled={statusUpdating}>
                {LEAD_STATUS_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
              {statusError && <p className="mt-2 text-xs text-rose-600">{statusError}</p>}
            </Card>

            <Card className="p-5">
              <h3 className="text-base font-semibold text-slate-900">Summary</h3>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Deal value</span>
                  <span className="font-medium text-slate-900">{formatCurrency(lead.estimatedDealValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Total notes</span>
                  <span className="font-medium text-slate-900">{notes.length}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
