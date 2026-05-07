import { useState } from 'react';
import { Button } from './Button';

export const NoteForm = ({ onSubmit, loading = false, currentUserName = 'Admin' }) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) {
      setError('Note content is required');
      return;
    }
    onSubmit({
      content: content.trim(),
      createdBy: currentUserName,
    });
    setContent('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Add Note</label>
        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (error) setError('');
          }}
          placeholder="Enter your note here..."
          rows="4"
          className={`
            w-full rounded-xl border bg-white/75 px-3.5 py-2.5 text-sm text-slate-900 backdrop-blur-sm
            focus:outline-none focus:ring-2
            ${error ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-300/60 focus:border-blue-500 focus:ring-blue-500/20'}
          `}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
      <div className="flex justify-end">
        <Button type="submit" size="md" disabled={loading || !content.trim()}>
          {loading ? 'Adding...' : 'Add Note'}
        </Button>
      </div>
    </form>
  );
};
