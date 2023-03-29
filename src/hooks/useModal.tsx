import { useState, useCallback } from 'react';
import FormModal from '../components/_scaffolding/FormModal';

export const useModal = (
  isListForm: boolean
): [() => JSX.Element | null, () => void] => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const Modal = (): JSX.Element | null => {
    if (!isOpen) return null;

    return (
      <FormModal
        isOpen={isOpen}
        handleClose={closeModal}
        isListForm={isListForm}
      />
    );
  };

  return [Modal, openModal];
};
