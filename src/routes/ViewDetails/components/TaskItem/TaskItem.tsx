import { FC, useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ArchiveBoxXMarkIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import moment from 'moment';

import { TTaskItemProps } from '../../../../types';
import ApiService from '../../../../common';
import { TasksContext } from '../../../../store/context';
import Button from '../../../../components/_scaffolding/Button';

type TTaskListProps = TTaskItemProps & {
  handleTaskClick: () => void;
  idList: string;
  deadline: string;
  isTaskDone?: boolean;
};

enum EDateEnum {
  READABLE_DATE_TIME_FORMAT = 'MMM Do YYYY HH:mm',
}

const getDeadlineMessage = (deadline: string, isTaskDone: boolean) => {
  const isAfterDeadline = moment().isAfter(deadline);

  const finishedTasksDeadlineMessage = isAfterDeadline
    ? 'Finished after deadline'
    : 'Finished in time';
  const activeTasksDeadlineMessage = isAfterDeadline
    ? 'Past deadline:'
    : 'Deadline:';

  if (isTaskDone) {
    return finishedTasksDeadlineMessage;
  }

  return activeTasksDeadlineMessage;
};

const TaskItem: FC<TTaskListProps> = ({
  handleTaskClick,
  title,
  idTask,
  description,
  deadline,
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

  const formattedDate = moment(deadline).format(
    EDateEnum.READABLE_DATE_TIME_FORMAT
  );

  const deadlineMessage = getDeadlineMessage(deadline, isTaskDone);

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
          <Button
            className="btn btn-active btn-primary btn-xs"
            onClick={handleTaskClick}
            label={isTaskDone ? 'Mark as active' : 'Mark as done'}
          />
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
      <div className="flex justify-end gap-2">
        <div className="text-red-600 text-sm font-semibold">
          {deadlineMessage}
        </div>
        <div className="text-slate-500 text-sm">
          {isTaskDone ? null : formattedDate}
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
