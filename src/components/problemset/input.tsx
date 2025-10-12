export const Input = ({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
}) => (
  <input
    className={`flex h-10 w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white/50 dark:bg-slate-800/50 px-3 py-2 text-sm text-gray-900 dark:text-slate-100 placeholder:text-gray-500 dark:placeholder:text-slate-400 focus:border-[#CCF301] focus:outline-none focus:ring-2 focus:ring-[#CCF301]/20 transition-all duration-200 ${className}`}
    {...props}
  />
);