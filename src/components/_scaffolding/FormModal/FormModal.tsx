import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import ApiService from '../../../common';
import { TSubmitFormProps } from '../../../types';

import ModalContent from '../../_modal/ModalContent';
import Form from '../../_form';

type TFormModalProps = {
  handleClose: () => void;
  isOpen: boolean;
  isListForm: boolean;
};

const FormModal: FC<TFormModalProps> = ({
  isOpen,
  handleClose,
  isListForm,
}) => {
  const queryClient = useQueryClient();
  const params = useParams();

  const { isLoading: createListLoading, mutate: createListMutation } =
    useMutation<TSubmitFormProps, Error>(
      'create-list',
      async (data: TFormModalProps) => {
        return await ApiService.create('/lists', data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['lists']);
          handleClose();
        },
      }
    );

  const { isLoading: createTaskLoading, mutate: createTaskMutation } =
    useMutation<TSubmitFormProps, Error>(
      'create-task',
      async (data: TFormModalProps) => {
        return await ApiService.create(`/lists/${params.idList}/tasks`, data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']);
          handleClose();
        },
      }
    );

  const onSubmit = (data: TSubmitFormProps): void => {
    const preparedData = {
      ...data,
    };
    isListForm
      ? createListMutation(preparedData)
      : createTaskMutation(preparedData);
  };

  return (
    <ModalContent isOpen={isOpen} handleClose={handleClose}>
      <Form
        formTitle={isListForm ? 'Create list' : 'Create task'}
        title={isListForm ? 'List title' : 'Task title'}
        description={isListForm ? 'List description' : 'Task description'}
        handleClose={handleClose}
        onSubmit={onSubmit}
        isListForm={isListForm}
        isLoading={createListLoading || createTaskLoading}
      />
    </ModalContent>
  );
};

export default FormModal;
