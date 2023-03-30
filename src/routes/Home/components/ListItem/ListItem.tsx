import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ApiService from 'src/common';
import { TListItemProps } from 'src/types';

import Button from 'src/components/_scaffolding/Button';

const ListItem: FC<TListItemProps> = ({ title, idList, description }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation<TListItemProps[], Error>(
    'delete-list',
    async () => {
      return await ApiService.deleteById(`/lists/${idList}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['lists']);
      },
    }
  );

  return (
    <div
      id={idList}
      className="card card-compact bg-white border-2 rounded border-gray-50 shadow-md p-5"
    >
      <div className="flex flex-col w-full gap-10">
        <h3 className="flex justify-center text-2xl">{title}</h3>
        <div title={description} className="text-base text-slate-500 truncate">
          {description}
        </div>
        <div className="flex justify-between">
          <Button
            className="btn btn-active btn-ghost"
            loadingClassName="btn btn-ghost loading"
            onClick={() => mutate()}
            label="Remove list"
            isLoading={isLoading}
          />
          <Button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/view-details/${idList}/tasks`);
            }}
            label="View details"
          />
        </div>
      </div>
    </div>
  );
};

export default ListItem;
