import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';

import ApiService from '../../../../common';
import { TListItemProps } from '../../../../types';

import Button from '../../../../components/_scaffolding/Button';

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
      className="card card-compact h-56 bg-white border-2 rounded border-gray-50 shadow-md"
    >
      <div className="card-body flex gap-10">
        <h2 className="card-title flex justify-center text-xl">{title}</h2>
        <p className="truncate">{description}</p>
        <div className="card-actions justify-between">
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
