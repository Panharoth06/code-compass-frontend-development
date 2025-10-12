export const CardTitle = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h5
    className={`text-base font-semibold text-gray-900 dark:text-slate-100 leading-tight ${className}`}
  >
    {children}
  </h5>
);