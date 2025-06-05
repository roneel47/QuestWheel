import type { FC } from 'react';
import XPBar from './XPBar';
import { APP_NAME } from '@/lib/constants';
import { Shield } from 'lucide-react';

interface HeaderProps {
  level: number;
  currentXP: number;
}

const Header: FC<HeaderProps> = ({ level, currentXP }) => {
  return (
    <header className="w-full p-4 bg-card shadow-lg rounded-lg mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-8 h-8 text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">{APP_NAME}</h1>
        </div>
        <div className="text-xl font-semibold">Level: {level}</div>
      </div>
      <XPBar currentXP={currentXP} level={level} />
    </header>
  );
};

export default Header;
