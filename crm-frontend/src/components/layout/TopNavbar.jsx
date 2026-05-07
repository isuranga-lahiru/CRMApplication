import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';

export const TopNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <FiMenu size={16} />
          </button>
          <h1 className="text-sm font-semibold text-slate-900 sm:text-base">CRM Workspace</h1>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-600 sm:text-sm">
          {user?.email || 'admin@example.com'}
        </div>
      </div>
    </header>
  );
};
