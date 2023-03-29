import { FC, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';

import { TTaskItemProps } from '../../../../types';
import ApiService from '../../../../common';
import { TasksContext } from '../../../../store/context';

import TaskItem from '../TaskItem';

type TTaskListProps = {
  idList: string;
  searchValue: string;
};

const TasksList: FC<TTaskListProps> = ({ idList, searchValue }) => {
  const { tasks, markAsDone, markAsActive } = useContext(TasksContext);

  const { isLoading, error, isError, data } = useQuery<TTaskItemProps[], Error>(
    'tasks',
    async () => {
      return await ApiService.findAll(`/lists/${idList}/tasks`);
    }
  );

  if (isError) {
    return <span>{error}</span>;
  }

  const filteredTasks = useMemo(() => {
    const normalizedValue = searchValue.toLowerCase().trim();

    if (isLoading) {
      return null;
    }

    if (normalizedValue === '') {
      return data;
    }

    const searchResult = data?.filter(
      (task: TTaskItemProps) =>
        task.title.toLowerCase().includes(normalizedValue) === true ||
        task.description.toLowerCase().includes(normalizedValue) === true
    );

    return searchResult;
  }, [searchValue, data]);

  const getSplittedTasks = () => {
    const activeTasks: TTaskItemProps[] = [];
    const finishedTasks: TTaskItemProps[] = [];

    filteredTasks?.map((task: TTaskItemProps) => {
      const idTask = Number(task.idTask);

      if (tasks?.[idTask]) {
        finishedTasks.push(task);
        return;
      }

      activeTasks.push(task);
    });

    return { activeTasks: activeTasks, finishedTasks: finishedTasks };
  };

  const handleTaskClick = (task: TTaskItemProps) => {
    const idTask = Number(task.idTask);

    if (tasks?.[idTask]) {
      markAsActive(task.idTask);
      return;
    }

    markAsDone(task.idTask);
  };

  const splittedTasks = getSplittedTasks();

  return (
    <div className="flex p-10 gap-10">
      <div className="flex flex-col h-full gap-3 w-1/2">
        <div className="text-slate-900 font-semibold text-xl text-center">
          Active tasks
        </div>
        {splittedTasks?.activeTasks.length === 0 && (
          <div className="text-slate-500">You don't have any active task.</div>
        )}
        {splittedTasks?.activeTasks.map((task) => (
          <TaskItem
            key={task.idTask}
            handleTaskClick={() => handleTaskClick(task)}
            idTask={task.idTask}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            idList={idList}
          />
        ))}
      </div>

      <div className="flex flex-col h-full gap-3 w-1/2">
        <div className="text-slate-900 font-semibold text-xl text-center">
          Finished tasks
        </div>
        {splittedTasks?.finishedTasks.length === 0 && (
          <div className="text-slate-500">
            You don't have any finished task yet.
          </div>
        )}
        {splittedTasks?.finishedTasks.map((task) => (
          <TaskItem
            key={task.idTask}
            handleTaskClick={() => handleTaskClick(task)}
            idTask={task.idTask}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            idList={idList}
            isTaskDone
          />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
