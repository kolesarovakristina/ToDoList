import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

import ApiService from '../../common';
import { TListItemProps, TTaskItemProps } from '../../types';
import { TasksContext } from '../../context';

import TasksList from '../../components/TasksList';

const ViewDetails = () => {
  const { tasks, markAsDone, markAsActive } = useContext(TasksContext);
  const params = useParams();

  const { isLoading: taskLoading, data: taskData } = useQuery<
    TTaskItemProps[],
    Error
  >('query-tasks', async () => {
    return await ApiService.findAll(`/lists/${params.idList}/tasks`);
  });

  const { isLoading: listLoading, data: listData } = useQuery<
    TListItemProps,
    Error
  >('query-lists', async () => {
    return await ApiService.findById(`/lists/${params.idList}`);
  });

  if (taskLoading || listLoading) {
    return <div>Loading..</div>;
  }

  const handleTaskClick = (task: TTaskItemProps) => {
    const idTask = Number(task.idTask);

    if (tasks?.[idTask]) {
      markAsActive(task.idTask);
      return;
    }
    markAsDone(task.idTask);
  };

  const getFilteredTasks = () => {
    const activeTasks: TTaskItemProps[] = [];
    const finishedTasks: TTaskItemProps[] = [];

    taskData?.map((task) => {
      const idTask = Number(task.idTask);

      if (tasks?.[idTask]) {
        finishedTasks.push(task);
        return;
      }

      activeTasks.push(task);
    });

    return { activeTasks: activeTasks, finishedTasks: finishedTasks };
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="card card-compact bg-white border-2 rounded border-gray-50 shadow-md h-4/5">
      <div className="grid grid-cols-3 items-center p-10">
        <div className="col-start-2 text-center text-5xl">
          {listData?.title}
        </div>
        <button className="btn btn-primary col-start-4">Remove list</button>
      </div>
      <div className="text-xl p-10 pt-0">{listData?.description}</div>
      <div className="flex gap-20 border-t overflow-x-auto">
        <div className="flex flex-col p-5 h-full gap-3 w-1/2">
          <div className="text-slate-900 font-semibold text-xl text-center">
            Active tasks
          </div>
          {filteredTasks.activeTasks.length === 0 && (
            <div>You don't have any active task.</div>
          )}
          {filteredTasks.activeTasks.map((task) => (
            <TasksList
              handleTaskClick={() => {
                handleTaskClick(task);
              }}
              idTask={task.idTask}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
              idList={params.idList!}
            />
          ))}
        </div>

        <div className="flex flex-col p-5 h-full gap-3 w-1/2">
          <div className="text-slate-900 font-semibold text-xl text-center">
            Finished tasks
          </div>
          {filteredTasks.finishedTasks.length === 0 && (
            <div>You don't have any finished task yet.</div>
          )}
          {filteredTasks.finishedTasks.map((task) => (
            <TasksList
              handleTaskClick={() => handleTaskClick(task)}
              idTask={task.idTask}
              title={task.title}
              description={task.description}
              createdAt={task.createdAt}
              idList={params.idList!}
              isTaskDone
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
