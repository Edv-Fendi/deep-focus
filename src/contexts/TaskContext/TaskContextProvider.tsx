import { useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { initialTaskState } from './initialTaskState';

type TaskContextProviderProps = {
  children: React.ReactNode;
};

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, setState] = useState<TaskStateModel>(initialTaskState);

  useEffect(() => {
    console.log('TaskContext state updated:', state);
  }, [state]);

  return (
    <TaskContext.Provider value={{ state, setState }}>
      {children}
    </TaskContext.Provider>
  );
}
