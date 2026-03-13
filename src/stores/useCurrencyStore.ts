import { create } from 'zustand';

interface CurrencyState {
  rates: Record<string, number>;
  isLoading: boolean;
  error: string | null;
  fetchRates: () => Promise<void>;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  rates: { PLN: 1 }, // Default fallback rates
  isLoading: false,
  error: null,
  fetchRates: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetching Table A from NBP API (Narodowy Bank Polski)
      const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      const ratesArray = data[0].rates;
      
      const newRates: Record<string, number> = { PLN: 1 };
      ratesArray.forEach((rate: { code: string; mid: number }) => {
        newRates[rate.code] = rate.mid;
      });
      
      set({ rates: newRates, isLoading: false });
    } catch (error) {
      console.error('Error fetching currency rates:', error);
      set({ 
        error: 'Failed to fetch latest exchange rates. Using fallback rates.', 
        isLoading: false,
        // Fallback rates in case of offline or API failure
        rates: { PLN: 1, USD: 4.0, EUR: 4.3, GBP: 5.0 }
      });
    }
  },
}));
