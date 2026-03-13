import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Subscription } from '../types/Subscription';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

interface SubscriptionFormProps {
  initialData?: Subscription;
  onSubmit: (data: Omit<Subscription, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export function SubscriptionForm({ initialData, onSubmit, onCancel }: SubscriptionFormProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    currency: 'PLN',
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    nextPayment: '',
    category: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        price: initialData.price.toString(),
        currency: initialData.currency,
        billingCycle: initialData.billingCycle,
        nextPayment: initialData.nextPayment,
        category: initialData.category || '',
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name: formData.name,
      price: parseFloat(formData.price),
      currency: formData.currency,
      billingCycle: formData.billingCycle,
      nextPayment: formData.nextPayment,
      category: formData.category,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('name')}</label>
        <Input
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Netflix, Spotify..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('price')}</label>
          <Input
            required
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('currency')}</label>
          <select
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
          >
            <option value="PLN">PLN</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('billing_cycle')}</label>
          <select
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
            value={formData.billingCycle}
            onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value as 'monthly' | 'yearly' })}
          >
            <option value="monthly">{t('monthly')}</option>
            <option value="yearly">{t('yearly')}</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('next_payment')}</label>
          <Input
            required
            type="date"
            value={formData.nextPayment}
            onChange={(e) => {
              let val = e.target.value;
              if (val) {
                const parts = val.split('-');
                if (parts[0] && parts[0].length > 4) {
                  parts[0] = parts[0].slice(0, 4);
                  val = parts.join('-');
                }
              }
              setFormData({ ...formData, nextPayment: val });
            }}
          />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">{t('category')}</label>
        <Input
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Entertainment, Work, etc."
        />
      </div>
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t('cancel')}
        </Button>
        <Button type="submit">
          {t('save')}
        </Button>
      </div>
    </form>
  );
}
