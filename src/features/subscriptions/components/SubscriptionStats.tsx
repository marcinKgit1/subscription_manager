import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { calculateMonthlyCost, calculateYearlyCost } from '../../../utils/calculations';
import { formatCurrency } from '../../../utils/currencyUtils';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import { Wallet, CalendarDays, Layers, Loader2 } from 'lucide-react';
import { useCurrencyStore } from '../../../stores/useCurrencyStore';

export function SubscriptionStats() {
  const { t } = useTranslation();
  const { subscriptions } = useSubscriptions();
  const { rates, isLoading } = useCurrencyStore();

  const monthlyCost = calculateMonthlyCost(subscriptions, rates);
  const yearlyCost = calculateYearlyCost(subscriptions, rates);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t('monthly_cost')}
          </CardTitle>
          <Wallet className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : formatCurrency(monthlyCost)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t('yearly_cost')}
          </CardTitle>
          <CalendarDays className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin text-slate-400" /> : formatCurrency(yearlyCost)}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {t('total_subscriptions')}
          </CardTitle>
          <Layers className="h-4 w-4 text-slate-500 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            {subscriptions.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
