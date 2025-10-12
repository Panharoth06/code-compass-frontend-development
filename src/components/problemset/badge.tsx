export const Badge = ({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?:
  | "default"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "danger";
  className?: string;
}) => {
  const baseClasses =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors";
  const variantClasses = {
    default: "bg-[#CCF301]/15 text-[#CCF301] border border-[#CCF301]/20",
    secondary:
      "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-600/50",
    outline: "border border-current text-gray-600 dark:text-slate-400",
    success:
      "bg-green-500/15 text-green-600 dark:text-green-400 border border-green-500/20",
    warning:
      "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/20",
    danger:
      "bg-red-500/15 text-red-600 dark:text-red-400 border border-red-500/20",
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};