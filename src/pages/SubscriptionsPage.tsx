import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/layout/Container';
import { SubscriptionList } from '../features/subscriptions/components/SubscriptionList';
import { SubscriptionStats } from '../features/subscriptions/components/SubscriptionStats';

export function SubscriptionsPage() {
  const { t } = useTranslation();

  return (
    <Container className="py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t('subscriptions')}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage all your active subscriptions in one place.
          </p>
        </div>
      </div>

      <SubscriptionStats />

      <SubscriptionList />
    </Container>
  );
}
