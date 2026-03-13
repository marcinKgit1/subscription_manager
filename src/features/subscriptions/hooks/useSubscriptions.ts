import { useSubscriptionsStore } from '../store/subscriptionsStore';
import { Subscription } from '../types/Subscription';

export function useSubscriptions() {
  const subscriptions = useSubscriptionsStore((state) => state.subscriptions);
  const addSubscription = useSubscriptionsStore((state) => state.addSubscription);
  const updateSubscription = useSubscriptionsStore((state) => state.updateSubscription);
  const deleteSubscription = useSubscriptionsStore((state) => state.deleteSubscription);
  const setSubscriptions = useSubscriptionsStore((state) => state.setSubscriptions);

  return {
    subscriptions,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    setSubscriptions,
  };
}
