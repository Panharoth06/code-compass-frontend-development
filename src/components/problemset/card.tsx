export const Card = ({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) => (
  <div
    className={`rounded-xl border border-gray-200 dark:border-slate-700/50 bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm ${hover
      ? "hover:border-[#CCF301]/50 hover:shadow-xl hover:shadow-[#CCF301]/10 transition-all duration-300"
      : ""
      } ${className}`}
  >
    {children}
  </div>
);
