export const Button = ({ 
  children, 
  variant = "default", 
  size = "default", 
  className = "", 
  ...props 
}) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-emerald-500 text-white shadow hover:bg-emerald-600",
    destructive: "bg-red-500 text-white shadow-sm hover:bg-red-600",
    outline: "border border-gray-300 bg-transparent shadow-sm hover:bg-gray-50 text-gray-900",
    secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-gray-900",
    link: "text-emerald-600 underline-offset-4 hover:underline",
    purple: "bg-brand-purple/90 text-white shadow hover:bg-brand-purple",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}; 