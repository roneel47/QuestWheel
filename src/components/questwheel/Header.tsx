
import type { FC } from 'react';
import Image from 'next/image';
import XPBar from './XPBar';
import { APP_NAME } from '@/lib/constants';

interface HeaderProps {
  level: number;
  currentXP: number;
}

const Header: FC<HeaderProps> = ({ level, currentXP }) => {
  return (
    <header className="w-full p-4 bg-card shadow-lg rounded-lg mb-6">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt={`${APP_NAME} logo`} width={32} height={32} className="text-primary" />
          <h1 className="text-3xl font-headline font-bold text-primary">{APP_NAME}</h1>
        </div>
        <div className="text-xl font-semibold">Level: {level}</div>
      </div>
      <XPBar currentXP={currentXP} level={level} />
    </header>
  );
};

export default Header;
