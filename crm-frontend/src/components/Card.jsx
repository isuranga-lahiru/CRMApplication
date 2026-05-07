export const Card = ({ children, className = '', onClick }) => {
  return (
    <div
      className={`
        glass-surface rounded-2xl
        transition-all duration-200
        ${onClick ? 'hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/10' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
