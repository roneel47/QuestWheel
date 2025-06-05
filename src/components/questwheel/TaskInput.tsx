"use client";

import type { FC } from 'react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <PlusCircle className="w-6 h-6 text-accent" />
          Add New Quest
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Enter your quest for today..."
            className="flex-grow"
            aria-label="New task input"
          />
          <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-5 w-5" /> Add Quest
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default TaskInput;
