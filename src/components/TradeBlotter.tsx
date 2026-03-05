import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import type { ColDef, ValueFormatterParams } from "ag-grid-community";
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import { Text } from "@salt-ds/core";
import { useTrades, type Trade } from "@/hooks/useTrades";
import { StatusBadge } from "./StatusBadge";
import "ag-grid-community/styles/ag-grid.css";
import "@salt-ds/ag-grid-theme/salt-ag-theme.css";
import "./TradeBlotter.scss";

ModuleRegistry.registerModules([AllCommunityModule]);

const timeFormatter = (p: ValueFormatterParams<Trade>) =>
  p.value instanceof Date ? p.value.toLocaleTimeString() : "";

const priceFormatter = (p: ValueFormatterParams<Trade>) =>
  typeof p.value === "number" ? p.value.toFixed(6) : "";

const qtyFormatter = (p: ValueFormatterParams<Trade>) =>
  typeof p.value === "number" ? p.value.toLocaleString(undefined, { maximumFractionDigits: 2 }) : "";

const sideCellClass = (params: { value: string }) =>
  params.value === "buy" ? "blotter__side--buy" : "blotter__side--sell";

const COL_DEFS: ColDef<Trade>[] = [
  { field: "time", headerName: "Time", valueFormatter: timeFormatter, width: 110, sort: "desc" },
  { field: "side", headerName: "Side", width: 70, cellClass: sideCellClass },
  { field: "price", headerName: "Price (USD)", valueFormatter: priceFormatter, width: 130 },
  { field: "qty", headerName: "Quantity", valueFormatter: qtyFormatter, width: 120 },
  { field: "ord_type", headerName: "Type", width: 80 },
];

interface TradeBlotterProps {
  symbol: string;
  label: string;
}

export function TradeBlotter({ symbol, label }: TradeBlotterProps) {
  const { trades, status, updatesPerMin } = useTrades(symbol);

  const colDefs = useMemo(() => COL_DEFS, []);

  return (
    <div className="trade-blotter">
      <div className="trade-blotter__header">
        <Text styleAs="h2" as="h2">{label} — Live Blotter</Text>
        <StatusBadge status={status} />
        <Text styleAs="label" className="trade-blotter__upm">{updatesPerMin} updates/min</Text>
      </div>
      <div className="ag-theme-salt-light trade-blotter__grid">
        <AgGridReact<Trade>
          rowData={trades}
          columnDefs={colDefs}
          getRowId={(p) => p.data.id}
          rowHeight={28}
          headerHeight={32}
          suppressMovableColumns
          suppressCellFocus
        />
      </div>
    </div>
  );
}
