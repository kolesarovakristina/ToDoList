import { createContext } from 'react';

export type TTasksContextProps = {
  readonly tasks: any;
  readonly markAsDone: (id: string) => void;
  readonly markAsActive: (id: string) => void;
  readonly deleteTask: (id: string) => void;
};

const initialState = {
  tasks: null,
  markAsDone: () => null,
  markAsActive: () => null,
  deleteTask: () => null,
};

export const TasksContext = createContext<TTasksContextProps>(initialState);
