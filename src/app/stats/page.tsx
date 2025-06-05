"use client";

import { useState, useEffect } from 'react';
import type { PlayerStats, DailyActivity } from '@/lib/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { APP_NAME, XP_FOR_NEXT_LEVEL_BASE } from '@/lib/constants';
import StatCard from '@/components/stats/StatCard';
import TasksOverTimeChart from '@/components/stats/TasksOverTimeChart';
import XpPerDayChart from '@/components/stats/XpPerDayChart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { TrendingUp, BarChartBig, Users, Award, CalendarDays, CheckCircle } from 'lucide-react';

export default function StatsPage() {
  const [playerStats] = useLocalStorage<PlayerStats>('questwheel-playerStats', {
    xp: 0,
    level: 0,
    lastSpinTimestamp: null,
    tasksCompletedTotal: 0,
  });
  const [activityLog] = useLocalStorage<DailyActivity[]>('questwheel-activityLog', []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 md:p-8">
        <div className="animate-pulse text-2xl font-headline">Loading Stats...</div>
      </div>
    );
  }

  const daysPlayed = new Set(activityLog.map(a => a.date)).size;
  const nextLevelXp = (playerStats.level + 1) * XP_FOR_NEXT_LEVEL_BASE;

  // Prepare data for charts (basic for now, can be expanded)
  const tasksOverTimeData = activityLog
    .slice(-30) // Last 30 entries (assuming sorted by date)
    .map(entry => ({ name: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), tasks: entry.tasksCompleted }))
    .reverse(); // if sorted desc, reverse for chart

  const xpPerDayData = activityLog
    .slice(-7) // Last 7 entries
    .map(entry => ({ name: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }), xp: entry.xpEarned }))
    .reverse();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-primary">Your Stats</h1>
      
      <section aria-labelledby="summary-stats">
        <h2 id="summary-stats" className="sr-only">Summary Statistics</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Tasks Completed" 
            value={playerStats.tasksCompletedTotal.toString()} 
            icon={<CheckCircle className="w-6 h-6 text-green-500" />} 
            description="Total quests conquered"
          />
          <StatCard 
            title="XP Earned" 
            value={playerStats.xp.toString()} 
            icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
            description="Total experience points"
          />
          <StatCard 
            title="Days Played" 
            value={daysPlayed.toString()} 
            icon={<CalendarDays className="w-6 h-6 text-purple-500" />}
            description="Total days of adventure"
          />
          <StatCard 
            title="Current Level" 
            value={playerStats.level.toString()} 
            icon={<Award className="w-6 h-6 text-yellow-500" />}
            description={`Next level at ${nextLevelXp} XP`}
          />
        </div>
      </section>

      <section aria-labelledby="charts-section" className="grid gap-6 md:grid-cols-2">
        <h2 id="charts-section" className="sr-only">Activity Charts</h2>
        <TasksOverTimeChart data={tasksOverTimeData} totalTasks={playerStats.tasksCompletedTotal} />
        <XpPerDayChart data={xpPerDayData} totalXp={playerStats.xp} />
      </section>

      <footer className="text-center text-sm text-muted-foreground mt-8 py-4">
        <p>&copy; {new Date().getFullYear()} {APP_NAME}. Keep up the quests!</p>
      </footer>
    </div>
  );
}
