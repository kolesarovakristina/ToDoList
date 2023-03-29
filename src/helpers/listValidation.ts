import { string, z } from 'zod';

const titleErrorMessage = 'Title must be between 1 and 20 characters long';
const descriptionErrorMessage =
  'Description must be between 1 and 100 characters long';

export const listSchema = z.object({
  title: string()
    .min(1, { message: titleErrorMessage })
    .max(20, { message: titleErrorMessage }),
  description: string()
    .min(1, { message: descriptionErrorMessage })
    .max(100, { message: descriptionErrorMessage }),
});
