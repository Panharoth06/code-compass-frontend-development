export const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`px-4 sm:px-6 pb-4 sm:pb-6 pt-0 ${className}`}>
    {children}
  </div>
);