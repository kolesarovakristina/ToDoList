import { FC, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ArchiveBoxXMarkIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

import { TTaskItemProps } from '../../types';
import ApiService from '../../common';
import { TasksContext } from '../../store/context';

type TTaskListProps = TTaskItemProps & {
  handleTaskClick: () => void;
  idList: string;
  createdAt: Date;
  isTaskDone?: boolean;
};

const TasksList: FC<TTaskListProps> = ({
  handleTaskClick,
  title,
  idTask,
  description,
  createdAt,
  idList,
  isTaskDone,
}) => {
  const queryClient = useQueryClient();

  const { deleteTask } = useContext(TasksContext);

  const { isLoading, mutate } = useMutation<TTaskItemProps[], Error>(
    'delete-task',
    async () => {
      return await ApiService.deleteById(`/lists/${idList}/tasks/${idTask}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks']);
        deleteTask(idTask);
      },
    }
  );

  return (
    <div
      id={idTask}
      className="group block w-full rounded-lg p-6 bg-white shadow-lg space-y-3 hover:bg-gray-200"
    >
      <div className="flex justify-between">
        <h3 className="text-slate-900 text-sm font-semibold text-xl">
          {title}
        </h3>
        <div className="flex gap-5">
          <button
            onClick={handleTaskClick}
            className="btn btn-active btn-primary btn-xs"
          >
            {isTaskDone ? 'Mark as active' : 'Mark as done'}
          </button>
          {isLoading ? (
            <ArrowPathIcon className="h-6 w-6 text-gray-500" />
          ) : (
            <ArchiveBoxXMarkIcon
              onClick={() => mutate()}
              className="h-6 w-6 text-gray-500 cursor-pointer"
            />
          )}
        </div>
      </div>

      <p className="text-slate-500 text-sm">{description}</p>
      <div className="text-slate-500 text-sm flex justify-end">{`${createdAt}`}</div>
    </div>
  );
};

export default TasksList;
