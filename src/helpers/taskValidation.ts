import { string, date, z } from 'zod';

const titleErrorMessage = 'Title must be between 1 and 20 characters long';
const descriptionErrorMessage =
  'Description must be between 1 and 20 characters long';

export const taskSchema = z.object({
  title: string()
    .min(1, { message: titleErrorMessage })
    .max(20, { message: titleErrorMessage }),
  description: string()
    .min(1, { message: descriptionErrorMessage })
    .max(50, { message: descriptionErrorMessage }),
  // deadline: date().refine(
  //   (value) => {
  //     const today = new Date();
  //     return value >= today;
  //   },
  //   {
  //     message: 'Deadline must be today or later',
  //   }
  // ),
});
