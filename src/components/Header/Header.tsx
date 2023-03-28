import { FC } from 'react';
import { useModal } from '../hooks/useModal';

const Header: FC = () => {
  const [Modal, openModal] = useModal(true);

  return (
    <div className="navbar bg-white h-24 flex justify-end drop-shadow-md">
      <a onClick={openModal} className="btn btn-ghost normal-case text-2xl">
        Add List
      </a>
      <Modal />
    </div>
  );
};

export default Header;
