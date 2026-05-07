import { NavLink } from 'react-router-dom';
import { FiGrid, FiUsers, FiLogOut, FiX } from 'react-icons/fi';
import { useAuth } from '../hooks/useAuth';

export const Sidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const menuItems = [
    { label: 'Dashboard', href: '/', icon: FiGrid },
    { label: 'Leads', href: '/leads', icon: FiUsers },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 transform flex-col border-r border-white/10 bg-slate-950/88 text-slate-100 shadow-2xl shadow-slate-950/40 backdrop-blur-xl transition-transform duration-200 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex h-24 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-base font-bold text-white shadow-md shadow-blue-600/40">
              A
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Astra CRM</p>
              <h1 className="text-lg font-semibold leading-tight text-white">Sales Workspace</h1>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
          >
            <FiX size={18} />
          </button>
        </div>

        <nav className="space-y-2 p-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex h-12 items-center gap-4 rounded-xl px-4 text-[15px] font-semibold transition ${
                    isActive
                      ? 'bg-blue-500/90 text-white shadow-md shadow-blue-900/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto border-t border-white/10 p-6">
          <button
            onClick={logout}
            className="flex h-12 w-full items-center gap-4 rounded-xl px-4 text-[15px] font-semibold text-slate-300 transition hover:bg-slate-800/80 hover:text-white"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
