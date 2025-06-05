export interface Task {
  id: string;
  text: string;
  createdAt: number;
}

export interface PlayerStats {
  xp: number;
  level: number;
  lastSpinTimestamp: number | null;
  tasksCompletedTotal: number;
}

export interface DailyActivity {
  date: string; // YYYY-MM-DD
  tasksCompleted: number;
  xpEarned: number;
}
