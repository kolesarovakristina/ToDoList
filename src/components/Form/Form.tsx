import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { taskSchema } from '../../helpers/taskValidation';
import { listSchema } from '../../helpers/listValidation';
import { TSubmitFormProps } from '../../types';

type TFormProps = {
  onSubmit: (data: TSubmitFormProps) => void;
  handleClose: () => void;
  title: string;
  description: string;
  formTitle: string;
  isListForm: boolean;
  isLoading: boolean;
};

const Form: FC<TFormProps> = ({
  formTitle,
  title,
  description,
  isListForm,
  handleClose,
  onSubmit,
  isLoading,
}) => {
  const schema = isListForm ? listSchema : taskSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSubmitFormProps>({ resolver: zodResolver(schema) });

  const handleSubmitForm = handleSubmit((data) => onSubmit(data));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-center text-black text-xl font-semibold">
        {formTitle}
      </div>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="text"
          placeholder={title}
          className="input input-bordered w-full bg-white"
          {...register('title')}
        />
        {errors?.title && <p>{errors.title.message}</p>}
        <input
          type="text"
          placeholder={description}
          className="input input-bordered w-full bg-white"
          {...register('description')}
        />
        {errors?.description && <p>{errors.description.message}</p>}
        <div className="form-group flex justify-center gap-5 w-full">
          <button
            onClick={handleClose}
            className="btn btn-active btn-ghost"
            type="button"
          >
            Cancel
          </button>
          {isLoading ? (
            <button className="btn loading btn-primary">Loading</button>
          ) : (
            <button className="btn btn-primary">Create</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Form;
