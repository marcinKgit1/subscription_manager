import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pl: {
    translation: {
      app_title: "Menedżer Subskrypcji",
      dashboard: "Panel Główny",
      dashboard_desc: "Przegląd kosztów subskrypcji i nadchodzących płatności.",
      view_all: "Zobacz wszystkie",
      subscriptions: "Subskrypcje",
      add_new: "Dodaj nową",
      monthly_cost: "Miesięczny koszt",
      yearly_cost: "Roczny koszt",
      total_subscriptions: "Liczba subskrypcji",
      upcoming_payments: "Najbliższe płatności",
      name: "Nazwa",
      price: "Cena",
      billing_cycle: "Cykl rozliczeniowy",
      next_payment: "Następna płatność",
      category: "Kategoria",
      actions: "Akcje",
      monthly: "Miesięcznie",
      yearly: "Rocznie",
      edit: "Edytuj",
      delete: "Usuń",
      save: "Zapisz",
      cancel: "Anuluj",
      search: "Szukaj...",
      filter_category: "Filtruj po kategorii",
      sort_by: "Sortuj po",
      sort_name: "Nazwie",
      sort_price: "Cenie",
      sort_date: "Dacie płatności",
      no_subscriptions: "Brak subskrypcji. Dodaj pierwszą!",
      payment_due: "Płatność za {{days}} dni",
      payment_today: "Płatność dzisiaj",
      payment_overdue: "Płatność zaległa o {{days}} dni",
      export_data: "Eksportuj dane",
      import_data: "Importuj dane",
      dark_mode: "Tryb Ciemny",
      light_mode: "Tryb Jasny",
      currency: "Waluta",
      confirm_delete: "Czy na pewno chcesz usunąć tę subskrypcję?",
      yes: "Tak",
      no: "Nie"
    }
  },
  en: {
    translation: {
      app_title: "Subscription Manager",
      dashboard: "Dashboard",
      dashboard_desc: "Overview of your subscription costs and upcoming payments.",
      view_all: "View All",
      subscriptions: "Subscriptions",
      add_new: "Add New",
      monthly_cost: "Monthly Cost",
      yearly_cost: "Yearly Cost",
      total_subscriptions: "Total Subscriptions",
      upcoming_payments: "Upcoming Payments",
      name: "Name",
      price: "Price",
      billing_cycle: "Billing Cycle",
      next_payment: "Next Payment",
      category: "Category",
      actions: "Actions",
      monthly: "Monthly",
      yearly: "Yearly",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      search: "Search...",
      filter_category: "Filter by category",
      sort_by: "Sort by",
      sort_name: "Name",
      sort_price: "Price",
      sort_date: "Payment Date",
      no_subscriptions: "No subscriptions found. Add your first one!",
      payment_due: "Payment due in {{days}} days",
      payment_today: "Payment due today",
      payment_overdue: "Payment overdue by {{days}} days",
      export_data: "Export Data",
      import_data: "Import Data",
      dark_mode: "Dark Mode",
      light_mode: "Light Mode",
      currency: "Currency",
      confirm_delete: "Are you sure you want to delete this subscription?",
      yes: "Yes",
      no: "No"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "pl", // default language
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
