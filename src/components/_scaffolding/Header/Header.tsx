import { FC } from 'react';
import { useModal } from '../../../hooks/useModal';

const Header: FC = () => {
  const [Modal, openModal] = useModal(true);

  return (
    <div className="navbar bg-white h-24 flex justify-between drop-shadow-md p-10">
      <div className="text-2xl text-violet-800 font-semibold">Todo App</div>
      <a onClick={openModal} className="btn btn-ghost normal-case text-2xl">
        Add List
      </a>
      <Modal />
    </div>
  );
};

export default Header;
