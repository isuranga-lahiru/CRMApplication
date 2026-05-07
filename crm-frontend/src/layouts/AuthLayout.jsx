export const AuthLayout = ({ children }) => {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-50 lg:grid-cols-2">
      <div className="hidden border-r border-slate-200 bg-white p-10 lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 font-semibold text-white">C</div>
          <h2 className="mt-6 text-3xl font-semibold text-slate-900">Clean CRM for modern sales teams</h2>
          <p className="mt-3 max-w-md text-sm text-slate-500">
            Track leads, manage status updates, and collaborate with context-rich notes in one focused workspace.
          </p>
        </div>
        <p className="text-sm text-slate-400">Internship Assessment UI</p>
      </div>
      <div className="flex items-center justify-center p-4 sm:p-8">{children}</div>
    </div>
  );
};
