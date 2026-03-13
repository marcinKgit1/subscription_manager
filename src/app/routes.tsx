import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { SubscriptionsPage } from '../pages/SubscriptionsPage';
import { Header } from '../components/layout/Header';

export function AppRoutes() {
  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900/30 dark:selection:text-indigo-100">
      {/* Modern subtle dotted background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-50"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/subscriptions" element={<SubscriptionsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
