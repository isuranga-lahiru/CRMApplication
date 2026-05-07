export const AuthLayout = ({ children }) => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-blue-500/30 blur-3xl" />
      <div className="absolute -right-20 bottom-4 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};
