import { useEffect, useState } from "react";
import { Text } from "@salt-ds/core";
import "./DashboardHeader.scss";

export function DashboardHeader() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <header className="dash-header">
      <div className="dash-header__brand">
        <span className="dash-header__dot" />
        <Text styleAs="h3" as="span">Crypto Market Dashboard</Text>
      </div>
      <div className="dash-header__meta">
        <Text styleAs="label" className="dash-header__meta-text">LIVE</Text>
        <Text styleAs="label" className="dash-header__clock">
          {now.toLocaleTimeString()} UTC{now.toLocaleString("en", { timeZoneName: "short" }).split(" ").pop()}
        </Text>
      </div>
    </header>
  );
}
