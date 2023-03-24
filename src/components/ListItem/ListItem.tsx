import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { TListItemProps } from '../../types';

const ListItem: FC<TListItemProps> = ({ title, idList, description }) => {
  const navigate = useNavigate();

  return (
    <div
      id={idList}
      className="card card-compact h-56 bg-white border-2 rounded border-gray-50 shadow-md"
    >
      <div className="card-body flex gap-10">
        <h2 className="card-title flex justify-center text-xl">{title}</h2>
        <p className="truncate">{description}</p>
        <div className="card-actions justify-end">
          <button
            onClick={() => {
              navigate(`/view-details/${idList}`);
            }}
            className="btn btn-primary"
          >
            View details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
