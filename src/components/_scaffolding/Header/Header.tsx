import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { EPathsEnum } from 'src/enums/PathsEnum';
import { useModal } from 'src/hooks/useModal';

const Header: FC = () => {
  const [Modal, openModal] = useModal(true);
  const navigate = useNavigate();

  return (
    <div className="navbar bg-white h-24 flex justify-between drop-shadow-md p-10">
      <a
        onClick={() => navigate(EPathsEnum.HOME)}
        className="text-2xl text-violet-800 font-semibold cursor-pointer"
      >
        Todo App
      </a>
      <a onClick={openModal} className="btn btn-ghost normal-case text-2xl">
        Add List
      </a>
      <Modal />
    </div>
  );
};

export default Header;
