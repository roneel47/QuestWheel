
"use client";
import type { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { APP_NAME } from '@/lib/constants';
import { Home, BarChart3, Bell, UserCircle, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useEffect } from 'react';

const SiteHeader: FC = () => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('questwheel-darkMode', true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between max-w-5xl mx-auto px-4">
        <Link href="/" className="flex items-center gap-2" aria-label={`${APP_NAME} home page`}>
          <Image src="/logo.png" alt={`${APP_NAME} logo`} width={28} height={28} className="text-primary" />
          <span className="text-xl font-bold text-primary">{APP_NAME}</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
            <Home className="w-4 h-4" /> Quests
          </Link>
          <Link href="/stats" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary flex items-center gap-1">
            <BarChart3 className="w-4 h-4" /> Stats
          </Link>
          <Button onClick={toggleDarkMode} variant="outline" size="icon" aria-label="Toggle dark mode" className="ml-auto">
             {darkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="text-muted-foreground hover:text-primary">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="User profile" className="text-muted-foreground hover:text-primary">
            <UserCircle className="w-6 h-6" />
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default SiteHeader;
