import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

type TModalProps = {
  readonly children: ReactNode;
};

const Modal: FC<TModalProps> = ({ children }) => {
  const renderModal = () => children;

  const modalElement = document.getElementById('modal')!;

  return ReactDOM.createPortal(renderModal(), modalElement);
};

export default Modal;
