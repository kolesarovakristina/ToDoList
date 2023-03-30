import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TSubmitFormProps } from 'src/types';
import { listSchema } from 'src/helpers/listValidation';
import { taskSchema } from 'src/helpers/taskValidation';

import DatePicker from 'src/components/_scaffolding/DatePicker';
import Button from 'src/components/_scaffolding/Button';

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
    control,
    formState: { errors },
  } = useForm<TSubmitFormProps>({ resolver: zodResolver(schema) });

  const handleSubmitForm = handleSubmit(data => onSubmit(data));

  const getErrorMessage = (error: string | undefined) => (
    <p className="text-red-600 text-sm">{error}</p>
  );

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-center text-black text-3xl font-semibold">
        {formTitle}
      </div>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="text"
          id="title"
          placeholder={title}
          className="input input-bordered w-full bg-white"
          {...register('title')}
        />
        {errors?.title && getErrorMessage(errors.title.message)}

        <input
          type="text"
          id="description"
          placeholder={description}
          className="input input-bordered w-full bg-white"
          {...register('description')}
        />
        {errors?.description && getErrorMessage(errors.description.message)}

        {!isListForm && <DatePicker control={control} />}
        {errors?.deadline && getErrorMessage(errors.deadline.message)}

        <div className="form-group flex justify-center gap-5 w-full">
          <Button
            onClick={handleClose}
            className="btn btn-active btn-ghost"
            label="Cancel"
          />
          <Button
            className="btn btn-primary"
            loadingClassName="btn loading btn-primary"
            isLoading={isLoading}
            label="Create"
          />
        </div>
      </form>
    </div>
  );
};

export default Form;
