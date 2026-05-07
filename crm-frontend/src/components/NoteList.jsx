import { Card } from './Card';
import { Loader } from './Loader';
import { EmptyState } from './EmptyState';
import { formatDateTime } from '../utils/formatters';

export const NoteList = ({ notes = [], loading = false, error = null }) => {
  if (loading) {
    return <Loader text="Loading notes..." />;
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
        {error}
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return <EmptyState icon="📝" title="No Notes" description="No notes added yet." />;
  }

  return (
    <div className="space-y-3">
      {notes.map((note, index) => (
        <Card key={note._id || index} className="p-4">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{note.createdBy}</p>
              <p className="text-xs text-slate-500">{formatDateTime(note.createdDate)}</p>
            </div>
          </div>
          <p className="whitespace-pre-wrap text-sm text-slate-700">{note.content}</p>
        </Card>
      ))}
    </div>
  );
};
