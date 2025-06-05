import type { FC } from 'react';
import { Progress } from '@/components/ui/progress';
import { XP_FOR_NEXT_LEVEL_BASE } from '@/lib/constants';

interface XPBarProps {
  currentXP: number;
  level: number;
}

const XPBar: FC<XPBarProps> = ({ currentXP, level }) => {
  const xpForCurrentLevelStart = level * XP_FOR_NEXT_LEVEL_BASE;
  const xpInCurrentLevel = currentXP - xpForCurrentLevelStart;
  const progressPercentage = (xpInCurrentLevel / XP_FOR_NEXT_LEVEL_BASE) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between text-sm mb-1">
        <span>XP: {currentXP}</span>
        <span>Next Lvl: {(level + 1) * XP_FOR_NEXT_LEVEL_BASE} XP</span>
      </div>
      <Progress value={progressPercentage} className="h-4 bg-muted [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
    </div>
  );
};

export default XPBar;
