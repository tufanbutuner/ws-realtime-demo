import { Spinner, Text } from "@salt-ds/core";
import "./StatRow.scss";

interface StatRowProps {
  label: string;
  value: string | null;
}

export function StatRow({ label, value }: StatRowProps) {
  return (
    <div className="stat-row">
      <Text styleAs="label" color="secondary">{label}</Text>
      {value !== null ? (
        <Text styleAs="label">£{value}</Text>
      ) : (
        <Spinner size="small" />
      )}
    </div>
  );
}
