export const Checkbox = ({ checked, onChange, className, ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
    className={`h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 ${className}`}
    {...props}
  />
);