interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-10">
      <h3 className="text-3xl font-bold text-[#CCF301]">{title}</h3>
      {subtitle && (
        <p className="mt-2 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}
