import { useState } from 'react';
import { Button } from '../ui/Button';

export const NoteForm = ({ onSubmit, loading = false, currentUserName = 'Admin' }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Note content is required');
      return;
    }
    onSubmit({ content: content.trim(), createdBy: currentUserName });
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          placeholder="Add context for follow-up, meeting updates, or call outcomes..."
          className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
            error ? 'border-rose-300 focus:ring-rose-200' : 'border-slate-200 focus:ring-slate-200'
          }`}
        />
        {error && <p className="mt-1 text-xs text-rose-600">{error}</p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit" loading={loading}>
          Add Note
        </Button>
      </div>
    </form>
  );
};
