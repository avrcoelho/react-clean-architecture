import * as yup from 'yup';

import inputMessages from '@/shared/contants/inputMessages';

const signInSchema = yup.object({
  email: yup
    .string()
    .email(inputMessages.invalidEmail)
    .required(inputMessages.requiredFiel),
  password: yup.string().required(inputMessages.requiredFiel),
});

export default signInSchema;
