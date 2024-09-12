import React, { createContext, useContext, useState } from 'react';

interface Task {
  text: string;
  isCompleted: boolean;
  isSelected: boolean;
  date: string;
}

interface TaskContextProps {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    { text: 'Buy groceries', isCompleted: false, isSelected: false, date: 'Jul 20, 2023 at 9:00 AM' },
    { text: 'Finish homework', isCompleted: false, isSelected: false, date: 'Jul 21, 2023 at 3:30 PM' },
    { text: 'Read a book', isCompleted: true, isSelected: false, date: 'Jul 19, 2023 at 6:00 PM' }
  ]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
