import type { ValidationStatus } from "@salt-ds/core";
import type { ConnectionStatus } from "@/hooks/useTicker";

export const statusConfig: Record<ConnectionStatus, { label: string; status: ValidationStatus }> = {
  connecting: { label: "Connecting", status: "info" },
  connected: { label: "Live", status: "success" },
  disconnected: { label: "Disconnected", status: "warning" },
  error: { label: "Error", status: "error" },
};
