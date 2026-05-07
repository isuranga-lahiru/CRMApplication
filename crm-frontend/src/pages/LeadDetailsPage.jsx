import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { leadService } from '../services/leadService';
import { noteService } from '../services/noteService';
import { MainLayout } from '../layouts/MainLayout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Loader } from '../components/Loader';
import { StatusBadge } from '../components/StatusBadge';
import { NoteForm } from '../components/NoteForm';
import { NoteList } from '../components/NoteList';
import { formatDate, formatCurrency } from '../utils/formatters';

export const LeadDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [addingNote, setAddingNote] = useState(false);
  const [noteError, setNoteError] = useState('');
  const [notes, setNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(false);

  const { data: lead, loading, error, refetch } = useApi(
    () => leadService.getLeadById(id),
    [id]
  );

  useEffect(() => {
    const loadNotes = async () => {
      setLoadingNotes(true);
      try {
        const data = await noteService.getNotes(id);
        setNotes(data.notes || []);
      } catch (err) {
        console.error('Error loading notes:', err);
      } finally {
        setLoadingNotes(false);
      }
    };

    if (id) {
      loadNotes();
    }
  }, [id]);

  const handleAddNote = async (noteData) => {
    setAddingNote(true);
    setNoteError('');
    try {
      const response = await noteService.addNote(id, noteData.content, noteData.createdBy);
      setNotes([...notes, response.note]);
    } catch (err) {
      setNoteError(err.response?.data?.message || 'Error adding note');
    } finally {
      setAddingNote(false);
    }
  };

  if (loading) return <Loader text="Loading lead details..." />;

  if (error || !lead) {
    return (
      <MainLayout>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="text-red-700">{error || 'Lead not found'}</p>
          <Button
            variant="secondary"
            onClick={() => navigate('/leads')}
            className="mt-4"
          >
            Back to Leads
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => navigate('/leads')}
            className="mb-4"
          >
            ← Back to Leads
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">{lead.leadName}</h1>
          <p className="mt-1 text-slate-500">{lead.companyName}</p>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Lead Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="font-medium text-slate-900">{lead.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Phone</p>
                <p className="font-medium text-slate-900">{lead.phoneNumber}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Lead Source</p>
                <p className="font-medium text-slate-900">{lead.leadSource}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Assigned Salesperson</p>
                <p className="font-medium text-slate-900">{lead.assignedSalesperson}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Deal Value</p>
                <p className="font-medium text-slate-900">
                  {formatCurrency(lead.estimatedDealValue)}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Created</p>
                <p className="font-medium text-slate-900">
                  {formatDate(lead.createdAt)}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Add Note
            </h2>
            {noteError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                {noteError}
              </div>
            )}
            <NoteForm
              onSubmit={handleAddNote}
              loading={addingNote}
              currentUserName={lead.assignedSalesperson}
            />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-xl font-semibold text-slate-900">
              Notes ({notes.length})
            </h2>
            <NoteList
              notes={notes}
              loading={loadingNotes}
              error={null}
            />
          </Card>
        </div>

        <div>
          <Card className="sticky top-24 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Summary</h3>
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm text-slate-500">Current Status</p>
                <div className="mt-2">
                  <StatusBadge status={lead.status} />
                </div>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm text-slate-500">Deal Value</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">
                  {formatCurrency(lead.estimatedDealValue)}
                </p>
              </div>
              <div className="border-b border-slate-200 pb-4">
                <p className="text-sm text-slate-500">Total Notes</p>
                <p className="mt-1 text-2xl font-bold text-slate-900">{notes.length}</p>
              </div>
              <div className="pt-4">
                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => navigate('/leads')}
                >
                  Go to All Leads
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};
