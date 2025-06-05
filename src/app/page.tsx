
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Task, PlayerStats, DailyActivity } from '@/lib/types';
import { XP_PER_TASK, XP_FOR_NEXT_LEVEL_BASE, APP_NAME } from '@/lib/constants';
import useLocalStorage from '@/hooks/useLocalStorage';

import Header from '@/components/questwheel/Header';
import TaskInput from '@/components/questwheel/TaskInput';
import TaskList from '@/components/questwheel/TaskList';
import RouletteWheel from '@/components/questwheel/RouletteWheel';
import ConfettiEffect from '@/components/questwheel/ConfettiEffect';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

// Define initial values outside the component to ensure stable references
const INITIAL_TASKS: Task[] = [];
const INITIAL_PLAYER_STATS: PlayerStats = {
  xp: 0,
  level: 0,
  lastSpinTimestamp: null,
  tasksCompletedTotal: 0,
};
const INITIAL_ACTIVITY_LOG: DailyActivity[] = [];


export default function QuestWheelPage() {
  const { toast } = useToast();
  const [tasks, setTasks] = useLocalStorage<Task[]>('questwheel-tasks', INITIAL_TASKS);
  const [playerStats, setPlayerStats] = useLocalStorage<PlayerStats>('questwheel-playerStats', INITIAL_PLAYER_STATS);
  const [activityLog, setActivityLog] = useLocalStorage<DailyActivity[]>('questwheel-activityLog', INITIAL_ACTIVITY_LOG);

  const [selectedTaskToday, setSelectedTaskToday] = useState<Task | null>(null);
  const [taskCompletedToday, setTaskCompletedToday] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const canSpinToday = useCallback(() => {
    if (!playerStats.lastSpinTimestamp) return true;
    const lastSpinDate = new Date(playerStats.lastSpinTimestamp).toDateString();
    const currentDate = new Date().toDateString();
    return lastSpinDate !== currentDate;
  }, [playerStats.lastSpinTimestamp]);

  const [spinAvailable, setSpinAvailable] = useState(false);

   useEffect(() => {
    if (isClient) { 
      const available = canSpinToday();
      setSpinAvailable(available);
      const storedSelectedTask = localStorage.getItem('questwheel-selectedTaskToday');
      const storedTaskCompleted = localStorage.getItem('questwheel-taskCompletedToday');
      
      if (!available && storedSelectedTask) {
          try {
            const parsedTask = JSON.parse(storedSelectedTask);
            setSelectedTaskToday(parsedTask);
            if (storedTaskCompleted) {
              setTaskCompletedToday(JSON.parse(storedTaskCompleted));
            }
          } catch (e) {
            console.warn("Error parsing selected task from localStorage", e);
            localStorage.removeItem('questwheel-selectedTaskToday');
            localStorage.removeItem('questwheel-taskCompletedToday');
          }
      } else if (available) {
        // If spin is available, clear any stale selected task from previous day
        setSelectedTaskToday(null);
        setTaskCompletedToday(false);
        localStorage.removeItem('questwheel-selectedTaskToday');
        localStorage.removeItem('questwheel-taskCompletedToday');
      }
    }
  }, [isClient, playerStats.lastSpinTimestamp, canSpinToday]);


  const updateActivityLog = useCallback(({ xp, taskCompleted }: { xp: number; taskCompleted: boolean }) => {
    const todayStr = new Date().toISOString().split('T')[0];
    setActivityLog(prevLog => {
      const log = [...prevLog];
      let todayEntry = log.find(entry => entry.date === todayStr);
      if (todayEntry) {
        todayEntry.xpEarned += xp;
        if (taskCompleted) {
          todayEntry.tasksCompleted += 1;
        }
      } else {
        log.push({ date: todayStr, xpEarned: xp, tasksCompleted: taskCompleted ? 1 : 0 });
      }
      return log.sort((a, b) => b.date.localeCompare(a.date));
    });
  }, [setActivityLog]);

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now().toString(), text, createdAt: Date.now() };
    setTasks(prevTasks => [...prevTasks, newTask]);
    toast({ title: "Quest Added!", description: `"${text}" has been added to your log.` });
  };

  const deleteTask = (id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    if (selectedTaskToday?.id === id) {
      setSelectedTaskToday(null);
      localStorage.removeItem('questwheel-selectedTaskToday');
    }
    toast({ title: "Quest Removed", description: "The quest has been removed from your log.", variant: "destructive" });
  };

  const handleSpinComplete = useCallback((selectedTask: Task) => {
    setSelectedTaskToday(selectedTask);
    setTaskCompletedToday(false);
    setShowConfetti(true);
    setPlayerStats(prev => ({ ...prev, lastSpinTimestamp: Date.now() }));
    setSpinAvailable(false);
    localStorage.setItem('questwheel-selectedTaskToday', JSON.stringify(selectedTask));
    localStorage.setItem('questwheel-taskCompletedToday', JSON.stringify(false));
    updateActivityLog({ xp: 0, taskCompleted: false });
    toast({ title: "Quest Selected!", description: `Your quest for today is: "${selectedTask.text}"` });
    setTimeout(() => setShowConfetti(false), 4000);
  }, [setPlayerStats, updateActivityLog, toast]);

  const completeTask = useCallback((task: Task) => {
    if (task.id === selectedTaskToday?.id && !taskCompletedToday) {
      const newXP = playerStats.xp + XP_PER_TASK;
      const newLevel = Math.floor(newXP / XP_FOR_NEXT_LEVEL_BASE);
      
      let levelUpMessage = "";
      if (newLevel > playerStats.level) {
        levelUpMessage = `Congratulations! You've reached Level ${newLevel}!`;
      }

      setPlayerStats(prev => ({
        ...prev,
        xp: newXP,
        level: newLevel,
        tasksCompletedTotal: prev.tasksCompletedTotal + 1,
      }));
      setTaskCompletedToday(true);
      localStorage.setItem('questwheel-taskCompletedToday', JSON.stringify(true));
      updateActivityLog({ xp: XP_PER_TASK, taskCompleted: true });
      toast({ title: "Quest Complete!", description: `You earned ${XP_PER_TASK} XP! ${levelUpMessage}` });
    }
  }, [selectedTaskToday, taskCompletedToday, playerStats, setPlayerStats, updateActivityLog, toast]);
  

  if (!isClient) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-background text-foreground">
            <div className="animate-pulse text-2xl font-headline">Loading QuestWheel...</div>
        </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 bg-background text-foreground font-body">
      <ConfettiEffect active={showConfetti} />
      <div className="w-full max-w-2xl space-y-6">
        <Header level={playerStats.level} currentXP={playerStats.xp} />
        
        <main className="space-y-8">
          <section aria-labelledby="roulette-section">
            <h2 id="roulette-section" className="sr-only">Roulette Wheel</h2>
            <RouletteWheel
              tasks={tasks}
              onSpinComplete={handleSpinComplete}
              disabled={!spinAvailable || tasks.length === 0}
              buttonText={!spinAvailable ? "Spin Used Today!" : "Spin Your Quest!"}
            />
          </section>

          {selectedTaskToday && !taskCompletedToday && spinAvailable === false && (
             <Card className="mt-4 p-4 text-center bg-primary/10 border-primary">
                <CardTitle className="text-lg text-primary">Today's Quest: {selectedTaskToday.text}</CardTitle>
                <CardDescription>Complete this quest to earn XP!</CardDescription>
                 <Button onClick={() => completeTask(selectedTaskToday)} className="mt-2" variant="default">
                    Mark as Complete ({XP_PER_TASK} XP)
                </Button>
             </Card>
          )}

          {selectedTaskToday && taskCompletedToday && (
             <Card className="mt-4 p-4 text-center bg-green-500/10 border-green-500">
                <CardTitle className="text-lg text-green-400">Quest Completed: {selectedTaskToday.text}</CardTitle>
                <CardDescription>Great job! You earned {XP_PER_TASK} XP for this quest.</CardDescription>
             </Card>
          )}
          
          <section aria-labelledby="task-input-section">
             <h2 id="task-input-section" className="sr-only">Add New Task</h2>
            <TaskInput onAddTask={addTask} />
          </section>

          <section aria-labelledby="task-list-section">
            <h2 id="task-list-section" className="sr-only">Task List</h2>
            <TaskList
              tasks={tasks}
              onDeleteTask={deleteTask}
              onCompleteTask={completeTask}
              selectedTaskToday={selectedTaskToday}
              taskCompletedToday={taskCompletedToday}
            />
          </section>
        </main>
        <footer className="text-center text-sm text-muted-foreground mt-8 py-4">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. Adventure Awaits!</p>
        </footer>
      </div>
    </div>
  );
}
