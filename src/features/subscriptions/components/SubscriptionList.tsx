import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Search, ArrowUpDown } from 'lucide-react';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { SubscriptionItem } from './SubscriptionItem';
import { SubscriptionForm } from './SubscriptionForm';
import { Subscription } from '../types/Subscription';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Modal } from '../../../components/ui/Modal';
import { useCurrencyStore } from '../../../stores/useCurrencyStore';
import { convertToPLN } from '../../../utils/currencyUtils';

export function SubscriptionList() {
  const { t } = useTranslation();
  const { subscriptions, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();
  const { rates } = useCurrencyStore();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState<Subscription | undefined>();
  const [subToDelete, setSubToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'date'>('date');

  const categories = useMemo(() => {
    const cats = new Set(subscriptions.map(s => s.category).filter(Boolean));
    return Array.from(cats) as string[];
  }, [subscriptions]);

  const filteredAndSortedSubs = useMemo(() => {
    let result = [...subscriptions];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => s.name.toLowerCase().includes(query));
    }

    // Filter by category
    if (categoryFilter) {
      result = result.filter(s => s.category === categoryFilter);
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') {
        const priceA = convertToPLN(a.price, a.currency, rates);
        const priceB = convertToPLN(b.price, b.currency, rates);
        return priceB - priceA; // Descending price
      }
      if (sortBy === 'date') return new Date(a.nextPayment).getTime() - new Date(b.nextPayment).getTime();
      return 0;
    });

    return result;
  }, [subscriptions, searchQuery, categoryFilter, sortBy, rates]);

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row gap-4 w-full">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <Input
              placeholder={t('search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">{t('filter_category')}</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select
            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="date">{t('sort_date')}</option>
            <option value="name">{t('sort_name')}</option>
            <option value="price">{t('sort_price')}</option>
          </select>
        </div>
        <Button onClick={openAddModal} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('add_new')}
        </Button>
      </div>

      {filteredAndSortedSubs.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-12 text-center dark:border-slate-700">
          <p className="text-slate-500 dark:text-slate-400">{t('no_subscriptions')}</p>
          <Button variant="link" onClick={openAddModal} className="mt-2">
            {t('add_new')}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedSubs.map(sub => (
            <SubscriptionItem
              key={sub.id}
              subscription={sub}
              onEdit={openEditModal}
              onDelete={(id) => setSubToDelete(id)}
            />
          ))}
        </div>
      )}

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
    </div>
  );
}
