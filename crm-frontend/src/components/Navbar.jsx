import { FiMenu } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <nav className="glass-surface fixed left-0 right-0 top-0 z-30 border-b border-white/50 md:left-72">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-xl border border-slate-300/60 bg-white/70 p-2 text-slate-600 transition hover:bg-white md:hidden"
          >
            <FiMenu size={18} />
          </button>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-bold text-white shadow-md shadow-blue-600/30">
            A
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Astra CRM</p>
            <h2 className="text-xl font-bold leading-tight text-slate-900">Revenue Command Center</h2>
          </div>
        </div>

        <div className="rounded-xl border border-slate-300/60 bg-white/70 px-4 py-2 text-sm text-slate-600 shadow-sm">
          Signed in as <span className="font-semibold text-slate-900">{user?.email || 'Admin'}</span>
        </div>
      </div>
    </nav>
  );
};
