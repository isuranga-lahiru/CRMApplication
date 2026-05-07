import { EmptyState } from '../ui/EmptyState';
import { Skeleton } from '../ui/Skeleton';
import { formatDateTime } from '../../utils/formatters';

export const NoteList = ({ notes = [], loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    );
  }

  if (!notes.length) {
    return <EmptyState title="No notes yet" description="Add the first note to start tracking lead context." />;
  }

  return (
    <div className="space-y-3">
      {notes.map((note, index) => (
        <div key={note._id || index} className="rounded-2xl border border-slate-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-900">{note.createdBy}</p>
            <p className="text-xs text-slate-500">{formatDateTime(note.createdDate)}</p>
          </div>
          <p className="text-sm text-slate-600">{note.content}</p>
        </div>
      ))}
    </div>
  );
};
