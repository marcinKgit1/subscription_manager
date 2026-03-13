import React, { useEffect } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { useCurrencyStore } from "../stores/useCurrencyStore";
import "../i18n";

export function App() {
  const fetchRates = useCurrencyStore((state) => state.fetchRates);
  const Router =
    typeof window !== "undefined" &&
    window.location.hostname.endsWith("github.io")
      ? HashRouter
      : BrowserRouter;

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
