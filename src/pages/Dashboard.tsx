import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SubscriptionStats } from '../features/subscriptions/components/SubscriptionStats';
import { Container } from '../components/layout/Container';
import { useSubscriptions } from '../features/subscriptions/hooks/useSubscriptions';
import { SubscriptionItem } from '../features/subscriptions/components/SubscriptionItem';
import { SubscriptionForm } from '../features/subscriptions/components/SubscriptionForm';
import { getDaysUntilPayment } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Plus } from 'lucide-react';
import { Subscription } from '../features/subscriptions/types/Subscription';

export function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { subscriptions, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | undefined>();
  const [subToDelete, setSubToDelete] = useState<string | null>(null);

  // Get top 3 upcoming payments
  const upcomingPayments = [...subscriptions]
    .sort((a, b) => {
      const daysA = getDaysUntilPayment(a.nextPayment);
      const daysB = getDaysUntilPayment(b.nextPayment);
      // If overdue, they should be at the top
      return daysA - daysB;
    })
    .slice(0, 3);

  const handleAddOrEdit = (data: Omit<Subscription, 'id' | 'createdAt'>) => {
    if (editingSub) {
      updateSubscription(editingSub.id, data);
    } else {
      addSubscription(data);
    }
    setIsModalOpen(false);
    setEditingSub(undefined);
  };

  const openEditModal = (sub: Subscription) => {
    setEditingSub(sub);
    setIsModalOpen(true);
  };

  const openAddModal = () => {
    setEditingSub(undefined);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (subToDelete) {
      deleteSubscription(subToDelete);
      setSubToDelete(null);
    }
  };

  return (
    <Container className="py-8 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            {t('dashboard')}
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {t('dashboard_desc')}
          </p>
        </div>
        <Button onClick={openAddModal}>
          <Plus className="mr-2 h-4 w-4" />
          {t('add_new')}
        </Button>
      </div>

      <SubscriptionStats />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            {t('upcoming_payments')}
          </h2>
          <Button variant="link" onClick={() => navigate('/subscriptions')}>
            {t('view_all')}
          </Button>
        </div>
        
        {upcomingPayments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 py-8 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">{t('no_subscriptions')}</p>
            <Button variant="link" onClick={openAddModal} className="mt-2">
              {t('add_new')}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingPayments.map(sub => (
              <SubscriptionItem
                key={sub.id}
                subscription={sub}
                onEdit={openEditModal}
                onDelete={(id) => setSubToDelete(id)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSub(undefined);
        }}
        title={editingSub ? t('edit') : t('add_new')}
      >
        <SubscriptionForm
          initialData={editingSub}
          onSubmit={handleAddOrEdit}
          onCancel={() => {
            setIsModalOpen(false);
            setEditingSub(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!subToDelete}
        onClose={() => setSubToDelete(null)}
        title={t('confirm_delete')}
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            {t('confirm_delete_message', 'Are you sure you want to delete this subscription? This action cannot be undone.')}
          </p>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setSubToDelete(null)}>
              {t('cancel')}
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              {t('delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </Container>
  );
}
