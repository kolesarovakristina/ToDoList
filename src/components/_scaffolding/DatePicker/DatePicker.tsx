import { FC } from 'react';
import { Controller } from 'react-hook-form';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TDatePickerProps = {
  control: any;
};

const DatePicker: FC<TDatePickerProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name="deadline"
      render={({ field }) => (
        <ReactDatePicker
          placeholderText="Select deadline for task"
          onChange={(date: Date) => field.onChange(date)}
          selected={field.value}
          dateFormat="MMMM d, yyyy HH:mm"
          showTimeSelect
        />
      )}
    />
  );
};

export default DatePicker;
