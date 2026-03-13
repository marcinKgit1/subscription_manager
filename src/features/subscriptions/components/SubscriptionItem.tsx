import React from 'react';
import { useTranslation } from 'react-i18next';
import { Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Subscription } from '../types/Subscription';
import { formatCurrency, convertToPLN } from '../../../utils/currencyUtils';
import { formatDate, getDaysUntilPayment, getPaymentStatus } from '../../../utils/dateUtils';
import { Button } from '../../../components/ui/Button';
import { cn } from '../../../lib/utils';
import { useCurrencyStore } from '../../../stores/useCurrencyStore';

interface SubscriptionItemProps {
  key?: React.Key;
  subscription: Subscription;
  onEdit: (sub: Subscription) => void;
  onDelete: (id: string) => void;
}

export function SubscriptionItem({ subscription, onEdit, onDelete }: SubscriptionItemProps) {
  const { t } = useTranslation();
  const { rates } = useCurrencyStore();
  const daysUntil = getDaysUntilPayment(subscription.nextPayment);
  const status = getPaymentStatus(daysUntil);

  const statusColors = {
    normal: "text-slate-500 dark:text-slate-400",
    warning: "text-amber-600 dark:text-amber-500",
    urgent: "text-red-600 dark:text-red-500 font-medium",
    overdue: "text-red-700 dark:text-red-400 font-bold",
  };

  const getStatusText = () => {
    if (daysUntil < 0) return t('payment_overdue', { days: Math.abs(daysUntil) });
    if (daysUntil === 0) return t('payment_today');
    return t('payment_due', { days: daysUntil });
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">{subscription.name}</h3>
          {subscription.category && (
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-300">
              {subscription.category}
            </span>
          )}
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
          <span className="font-medium text-slate-900 dark:text-slate-100">
            {formatCurrency(subscription.price, subscription.currency)}
            {subscription.currency !== 'PLN' && (
              <span className="text-slate-500 dark:text-slate-400 font-normal ml-1">
                (~{formatCurrency(convertToPLN(subscription.price, subscription.currency, rates), 'PLN')})
              </span>
            )}
            <span className="text-slate-500 dark:text-slate-400 font-normal ml-1">/ {t(subscription.billingCycle)}</span>
          </span>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">•</span>
          <span className="text-slate-600 dark:text-slate-400">
            {t('next_payment')}: {formatDate(subscription.nextPayment)}
          </span>
        </div>
        <div className={cn("mt-2 flex items-center gap-1 text-sm", statusColors[status])}>
          {(status === 'warning' || status === 'urgent' || status === 'overdue') && <AlertCircle className="h-4 w-4" />}
          <span>{getStatusText()}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Button variant="outline" size="sm" onClick={() => onEdit(subscription)}>
          <Pencil className="mr-2 h-4 w-4" />
          {t('edit')}
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(subscription.id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          {t('delete')}
        </Button>
      </div>
    </div>
  );
}
