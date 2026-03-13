import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { useCurrencyStore } from '../stores/useCurrencyStore';
import '../i18n';

export function App() {
  const fetchRates = useCurrencyStore((state) => state.fetchRates);

  useEffect(() => {
    fetchRates();
  }, [fetchRates]);

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
