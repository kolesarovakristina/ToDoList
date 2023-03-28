import { FC, ReactNode, useRef, useReducer, useEffect, useMemo } from 'react';

import { taskReducer } from '../reducer/taskReducer';
import { ETaskActionsEnum } from '../actions';
import { TasksContext } from '../context';

type TProductsProviderProps = {
  children: ReactNode;
  id?: string;
};

const TasksProvider: FC<TProductsProviderProps> = ({ children, id = '1' }) => {
  const localData = useRef(localStorage.getItem('tasks'));

  const [tasks, dispatch] = useReducer(
    taskReducer,
    localData.current ? JSON.parse(localData.current) : null
  );

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, id]);

  const value = useMemo(
    () => ({
      tasks,
      markAsDone: (id: string) =>
        dispatch({
          type: ETaskActionsEnum.MARK_AS_DONE,
          id,
        }),
      markAsActive: (id: string) =>
        dispatch({
          type: ETaskActionsEnum.MARK_AS_ACTIVE,
          id,
        }),
      deleteTask: (id: string) =>
        dispatch({
          type: ETaskActionsEnum.DELETE_TASK,
          id,
        }),
    }),
    [tasks]
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
};

export default TasksProvider;
