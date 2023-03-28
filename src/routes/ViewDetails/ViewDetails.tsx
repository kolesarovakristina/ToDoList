import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import ApiService from '../../common';
import { TListItemProps, TTaskItemProps } from '../../types';
import { TasksContext } from '../../store/context';

import TasksList from '../../components/TasksList';
import { useModal } from '../../components/hooks/useModal';
import Loading from '../../components/Loading';

const ViewDetails = () => {
  const { tasks, markAsDone, markAsActive } = useContext(TasksContext);
  const navigate = useNavigate();
  const [Modal, openModal] = useModal(false);
  const params = useParams();
  const queryClient = useQueryClient();

  const { isLoading: taskLoading, data: taskData } = useQuery<
    TTaskItemProps[],
    Error
  >('tasks', async () => {
    return await ApiService.findAll(`/lists/${params.idList}/tasks`);
  });

  const { isLoading: listLoading, data: listData } = useQuery<
    TListItemProps,
    Error
  >('list', async () => {
    return await ApiService.findById(`/lists/${params.idList}`);
  });

  const { isLoading: deleteListLoading, mutate } = useMutation<
    TTaskItemProps[],
    Error
  >(
    'delete-list',
    async () => {
      return await ApiService.deleteById(`/lists/${params.idList}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lists']);
        navigate('/');
      },
    }
  );

  if (taskLoading || listLoading) {
    return <Loading />;
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
        <div className="flex flex-col gap-5 col-start-4">
          {deleteListLoading ? (
            <button className="btn loading btn-primary">Loading</button>
          ) : (
            <button onClick={() => mutate} className="btn btn-primary">
              Remove list
            </button>
          )}

          <button onClick={openModal} className="btn btn-primary">
            Create task
          </button>
        </div>
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
              handleTaskClick={() => handleTaskClick(task)}
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
      <Modal />
    </div>
  );
};

export default ViewDetails;
