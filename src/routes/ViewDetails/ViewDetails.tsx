import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import ApiService from '../../common';
import { TListItemProps, TTaskItemProps } from '../../types';
import { useModal } from '../../hooks/useModal';

import Loading from '../../components/_scaffolding/Loading';
import TasksList from './components/TasksList';
import Button from '../../components/_scaffolding/Button';

const ViewDetails: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [Modal, openModal] = useModal(false);

  const navigate = useNavigate();
  const params = useParams();
  const queryClient = useQueryClient();

  const {
    isLoading: listLoading,
    data: listData,
    error,
    isError,
  } = useQuery<TListItemProps, Error>('list', async () => {
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

  if (listLoading) {
    return <Loading />;
  }

  if (isError) {
    return <span>{error}</span>;
  }

  const handleSearchOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  return (
    <div className="card card-compact bg-white border-2 rounded border-gray-50 shadow-md h-4/5 max-w-screen-lg m-auto">
      <div className="p-5">
        <div className="grid lg:grid-cols-3 sm:grid-cols-2">
          <div
            title={listData?.title}
            className="col-start-2 text-center text-5xl text-slate-900 truncate"
          >
            {listData?.title}
          </div>
          <div className="flex flex-col gap-5 col-start-4">
            <Button
              className="btn btn-primary"
              loadingClassName="btn loading btn-primary"
              onClick={() => mutate()}
              label="Remove list"
              isLoading={deleteListLoading}
            />
            <Button
              className="btn btn-primary"
              loadingClassName="btn loading btn-primary"
              onClick={openModal}
              label=" Create task"
            />
          </div>
        </div>

        <div className="text-xl py-5 text-slate-500">
          {listData?.description}
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            name="title"
            id="search-tasks-input"
            placeholder="Search by title or description"
            value={searchValue}
            onChange={handleSearchOnChange}
            className="input input-bordered bg-white lg:w-2/5 w-full"
          />
        </div>
      </div>

      <div className="flex flex-col border-t overflow-x-auto w-full">
        <TasksList searchValue={searchValue} idList={params.idList!} />
      </div>
      <Modal />
    </div>
  );
};

export default ViewDetails;
