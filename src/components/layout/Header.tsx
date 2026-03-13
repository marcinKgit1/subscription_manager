import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Languages, CreditCard } from 'lucide-react';
import { Container } from './Container';
import { Button } from '../ui/Button';

export function Header() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pl' ? 'en' : 'pl');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-50">
              <CreditCard className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline-block">{t('app_title')}</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium">
              <Link
                to="/"
                className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${
                  location.pathname === '/' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {t('dashboard')}
              </Link>
              <Link
                to="/subscriptions"
                className={`transition-colors hover:text-slate-900 dark:hover:text-slate-50 ${
                  location.pathname === '/subscriptions' ? 'text-slate-900 dark:text-slate-50' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                {t('subscriptions')}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLanguage} title="Toggle Language">
              <Languages className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} title={isDark ? t('light_mode') : t('dark_mode')}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
