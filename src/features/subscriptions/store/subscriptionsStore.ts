import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Subscription } from '../types/Subscription';

interface SubscriptionsState {
  subscriptions: Subscription[];
  addSubscription: (sub: Omit<Subscription, 'id' | 'createdAt'>) => void;
  updateSubscription: (id: string, sub: Partial<Subscription>) => void;
  deleteSubscription: (id: string) => void;
  setSubscriptions: (subs: Subscription[]) => void;
}

export const useSubscriptionsStore = create<SubscriptionsState>()(
  persist(
    (set) => ({
      subscriptions: [],
      addSubscription: (sub) => set((state) => {
        const newSub: Subscription = {
          ...sub,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        };
        return { subscriptions: [...state.subscriptions, newSub] };
      }),
      updateSubscription: (id, updatedSub) => set((state) => ({
        subscriptions: state.subscriptions.map((sub) =>
          sub.id === id ? { ...sub, ...updatedSub } : sub
        ),
      })),
      deleteSubscription: (id) => set((state) => ({
        subscriptions: state.subscriptions.filter((sub) => sub.id !== id),
      })),
      setSubscriptions: (subs) => set({ subscriptions: subs }),
    }),
    {
      name: 'subscription-storage',
    }
  )
);
