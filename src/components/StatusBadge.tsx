import { StatusIndicator, Text } from "@salt-ds/core";
import { statusConfig } from "@/config/statusConfig";
import type { ConnectionStatus } from "@/hooks/useTicker";
import "./StatusBadge.scss";

interface StatusBadgeProps {
  status: ConnectionStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, status: validationStatus } = statusConfig[status];
  return (
    <div className="status-badge">
      <StatusIndicator status={validationStatus} />
      <Text styleAs="label">{label}</Text>
    </div>
  );
}
