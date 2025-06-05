import type { FC } from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, CheckCircle2, ListChecks } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: string) => void;
  onCompleteTask: (task: Task) => void;
  selectedTaskToday: Task | null;
  taskCompletedToday: boolean;
}

const TaskList: FC<TaskListProps> = ({ tasks, onDeleteTask, onCompleteTask, selectedTaskToday, taskCompletedToday }) => {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <ListChecks className="w-6 h-6 text-accent" />
          Your Quest Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No quests yet. Add some above!</p>
        ) : (
          <ScrollArea className="h-60">
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className={`flex items-center justify-between p-3 rounded-md bg-card-foreground/5 hover:bg-card-foreground/10 transition-colors
                    ${selectedTaskToday?.id === task.id ? 'ring-2 ring-primary shadow-md' : ''}
                    ${selectedTaskToday?.id === task.id && taskCompletedToday ? 'opacity-50 line-through' : ''}
                  `}
                >
                  <span className="flex-grow mr-2 break-all">{task.text}</span>
                  <div className="flex gap-2 shrink-0">
                    {selectedTaskToday?.id === task.id && !taskCompletedToday && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCompleteTask(task)}
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-primary-foreground"
                        aria-label={`Complete task: ${task.text}`}
                      >
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Complete
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onDeleteTask(task.id)}
                      aria-label={`Delete task: ${task.text}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskList;
