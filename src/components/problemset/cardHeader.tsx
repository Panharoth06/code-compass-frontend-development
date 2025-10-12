export const CardHeader = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 sm:p-6 pb-3 ${className}`}>{children}</div>;