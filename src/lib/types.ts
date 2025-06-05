export interface Task {
  id: string;
  text: string;
  createdAt: number;
}

export interface PlayerStats {
  xp: number;
  level: number;
  lastSpinTimestamp: number | null;
}
