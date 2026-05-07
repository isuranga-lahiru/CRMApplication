export const Input = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  name,
  id,
  label,
  error,
  disabled = false,
  className = '',
  required = false,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id || name}
          className="mb-1.5 block text-sm font-semibold text-slate-700"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={id || name}
        disabled={disabled}
        className={`
          h-11 w-full rounded-xl border bg-white/75 px-3.5 text-sm text-slate-900 backdrop-blur-sm
          focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20
          disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500
          ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-300/60'}
          ${className}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};
