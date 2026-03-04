import { Spinner, Text } from "@salt-ds/core";
import "./StatRow.scss";

interface StatRowProps {
  label: string;
  value: string | null;
  prefix?: string;
}

export function StatRow({ label, value, prefix = '$' }: StatRowProps) {
  return (
    <div className="stat-row">
      <Text styleAs="label" color="secondary">{label}</Text>
      {value !== null ? (
        <Text styleAs="label">{prefix}{value}</Text>
      ) : (
        <Spinner size="small" />
      )}
    </div>
  );
}
