import { ButtonProps } from "@/lib/types/ButtonProps";

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "default",
  size = "default",
  className = "",
  onClick,
  disabled = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCF301]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-900 disabled:pointer-events-none disabled:opacity-50 touch-manipulation";
  const variants = {
    default:
      "bg-[#CCF301] text-gray-900 hover:bg-[#CCF301]/90 shadow-lg shadow-[#CCF301]/25 hover:shadow-[#CCF301]/30",
    outline:
      "border border-gray-300 dark:border-slate-600 bg-transparent text-gray-700 dark:text-slate-300 hover:bg-[#CCF301]/10 hover:text-[#CCF301] hover:border-[#CCF301]/50",
    ghost:
      "text-gray-600 dark:text-slate-400 hover:text-[#CCF301] hover:bg-[#CCF301]/10",
    secondary:
      "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600",
  };
  const sizes = {
    default: "h-10 px-4 py-2 text-sm sm:text-base",
    sm: "h-8 px-3 text-xs sm:text-sm",
    icon: "h-10 w-10 min-h-10 min-w-10",
    lg: "h-12 px-6 text-sm sm:text-base",
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};