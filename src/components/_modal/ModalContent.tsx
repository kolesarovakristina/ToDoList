import { FC } from 'react';

import ReactModal from 'react-modal';
import Modal from './components/Modal';

type TModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose(): void;
};

const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.4)',
    boxShadow: '0 4px 11px rgba(0, 0, 0, 0.3)',
    borderRadius: '8px',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '500px',
    maxHeight: '100vh',
    width: '100%',
    padding: '40px 20px',
  },
};

const ModalContent: FC<TModalProps> = ({ children, isOpen, handleClose }) => {
  return (
    <Modal>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleClose}
        style={customStyles}
        ariaHideApp={false}
      >
        {children}
      </ReactModal>
    </Modal>
  );
};

export default ModalContent;
