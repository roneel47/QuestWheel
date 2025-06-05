"use client";

import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dices, Zap } from 'lucide-react';
import * as Tone from 'tone';

interface RouletteWheelProps {
  tasks: Task[];
  onSpinComplete: (selectedTask: Task) => void;
  disabled: boolean;
  buttonText?: string;
}

const RouletteWheel: FC<RouletteWheelProps> = ({ tasks, onSpinComplete, disabled, buttonText = "Spin the Wheel!" }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayText, setDisplayText] = useState<string>("Ready to Spin?");
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  
  const spinSound = useRef<Tone.Player | null>(null);
  const winSound = useRef<Tone.Player | null>(null);
  const clickSound = useRef<Tone.Synth | null>(null);

  useEffect(() => {
    // Initialize Tone.js objects on client side
    if (typeof window !== "undefined") {
      spinSound.current = new Tone.Player("/sounds/spin.mp3").toDestination();
      winSound.current = new Tone.Player("/sounds/win.mp3").toDestination();
      clickSound.current = new Tone.MembraneSynth().toDestination();
      clickSound.current.volume.value = -10; // Lower volume for click
    }
  }, []);

  const playSound = async (soundType: 'spin' | 'win' | 'click') => {
    await Tone.start(); // Ensure AudioContext is started
    if (soundType === 'spin' && spinSound.current) {
      spinSound.current.start();
    } else if (soundType === 'win' && winSound.current) {
      winSound.current.start();
    } else if (soundType === 'click' && clickSound.current) {
      clickSound.current.triggerAttackRelease("C2", "8n");
    }
  };

  const handleSpin = () => {
    if (tasks.length === 0 || isSpinning || disabled) return;

    setIsSpinning(true);
    playSound('spin');
    setDisplayText("Spinning...");

    let spinCycles = tasks.length * 2 + Math.floor(Math.random() * tasks.length); // At least 2 full cycles
    const finalIndex = Math.floor(Math.random() * tasks.length);
    let currentIndex = 0;
    let cycleCount = 0;
    
    const intervalId = setInterval(() => {
      playSound('click');
      setHighlightedIndex(currentIndex % tasks.length);
      setDisplayText(tasks[currentIndex % tasks.length].text);
      currentIndex++;
      cycleCount++;

      if (cycleCount >= spinCycles && (currentIndex % tasks.length) === finalIndex) {
        clearInterval(intervalId);
        const selectedTask = tasks[finalIndex];
        setDisplayText(`Selected: ${selectedTask.text}!`);
        setHighlightedIndex(finalIndex);
        onSpinComplete(selectedTask);
        setIsSpinning(false);
        playSound('win');
      }
    }, 150); // Speed of cycling through tasks
  };

  return (
    <Card className="w-full shadow-xl text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Dices className="w-7 h-7 text-primary" />
          Daily Quest Roulette
        </CardTitle>
        <CardDescription>Spin the wheel to select your quest for the day!</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div 
          className="h-24 flex items-center justify-center p-4 bg-muted rounded-md text-xl font-semibold overflow-hidden relative"
          aria-live="polite"
          data-ai-hint="scroll text"
        >
          <span className={`transition-all duration-150 ease-in-out ${isSpinning ? 'animate-roulette-spin' : ''}`}>
            {displayText}
          </span>
        </div>
        
        {tasks.length > 0 && (
          <div className="h-20 overflow-y-auto border border-dashed border-border p-2 rounded-md">
            <ul className="space-y-1">
              {tasks.map((task, index) => (
                <li 
                  key={task.id} 
                  className={`p-1 rounded text-sm ${highlightedIndex === index ? 'bg-primary text-primary-foreground font-bold' : 'text-muted-foreground'}`}
                >
                  {task.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button
          onClick={handleSpin}
          disabled={isSpinning || disabled || tasks.length === 0}
          className="w-full text-lg py-6 bg-accent hover:bg-accent/90"
          size="lg"
        >
          <Zap className="mr-2 h-5 w-5" />
          {isSpinning ? "Spinning..." : (tasks.length === 0 ? "Add Quests First!" : buttonText)}
        </Button>
      </CardContent>
    </Card>
  );
};

export default RouletteWheel;
