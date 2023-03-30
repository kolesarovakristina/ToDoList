import { FC } from 'react';
import { MutationFunction, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import ApiService from 'src/common';
import { TSubmitFormProps } from 'src/types';

import Form from 'src/components/_form';
import ModalContent from 'src/components/_modal';

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
    useMutation<MutationFunction<TSubmitFormProps, void>, Error>(
      'create-list',
      async data => {
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
    useMutation<MutationFunction<TSubmitFormProps, void>, Error>(
      'create-task',
      async data => {
        return await ApiService.create(`/lists/${params.idList}/tasks`, data);
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['tasks']);
          handleClose();
        },
      }
    );

  const onSubmit = (data: TSubmitFormProps) => {
    const preparedData: any = {
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
