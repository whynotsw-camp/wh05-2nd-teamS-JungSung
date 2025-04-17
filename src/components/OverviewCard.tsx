interface Props {
  title: string;
  value: string;
  subtitle?: string;
}

export default function OverviewCard({ title, value, subtitle }: Props) {
  return (
    <div className="bg-card border border-border shadow-card rounded-xl p-6">
      <h3 className="text-sm text-gray-500 mb-1">{title}</h3>
      <p className="text-2xl font-semibold text-accent">
        {value}
        {subtitle && (
          <span className="ml-1 text-sm text-gray-500">{subtitle}</span>
        )}
      </p>
    </div>
  );
}
