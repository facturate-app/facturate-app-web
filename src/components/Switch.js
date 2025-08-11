export const Switch = ({ checked, onChange, className, ...props }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 ${checked ? 'bg-emerald-600' : 'bg-gray-200'} ${className}`}
    onClick={() => onChange(!checked)}
    {...props}
  >
    <span
      className={`block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'}`}
    />
  </button>
);